import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import * as childProcess from 'child_process';
import { app, BrowserWindow, ipcMain, shell, Notification } from 'electron';
import * as path from 'path';
import { join } from 'path';
import { DisconnectReason, makeWASocket, useMultiFileAuthState, delay } from '@whiskeysockets/baileys';
import fs from 'fs-extra';
import { Boom } from '@hapi/boom'

// Start the Express server
const serverProcess = childProcess.fork(path.join('', 'src/shared/server.js'));



let mainWindow: BrowserWindow | null = null;

let lastStatus: 'connecting' | 'connected' | 'disconnected' = 'connecting';
let lastUserInfo: { name: string; phone: string; profilePicture?: string } | null = null;

let sock;

async function connectToWhatsApp() {
  const sessionPath = path.join(app.getPath('userData'), 'auth_info_baileys');

  if (!fs.existsSync(sessionPath)) {
    console.log('Session folder does not exist. Creating...');
    fs.ensureDirSync(sessionPath);
  }

  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const socket = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  socket.ev.on('connection.update', async (update) => {
    const { qr, connection, lastDisconnect } = update;

    if (mainWindow) {
      if (connection === 'open') {
        lastStatus = 'connected';

        // Fetch user information
        lastUserInfo = {
          name: socket.user?.name || 'Unknown',
          phone: socket.user?.id.split(':')[0] || 'Unknown',
          profilePicture: await socket.profilePictureUrl(socket.user?.id || ''),
        };

        mainWindow.webContents.send('whatsapp-user-info', lastUserInfo);
        mainWindow.webContents.send('whatsapp-status', 'connected');

        const NOTIFICATION_TITLE = 'خدمة الواتساب'
        const NOTIFICATION_BODY = 'خدمة الواتساب متاحة والحساب متصل بنجاح!'
        new Notification({
          title: NOTIFICATION_TITLE,
          body: NOTIFICATION_BODY
        }).show()
      }

      if (qr) {
        console.log('New QR Code Generated:', qr);
        mainWindow.webContents.send('qr-code', qr);
      }

      if (connection === 'close') {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

        if (shouldReconnect) {
          console.log('Reconnecting to WhatsApp...');
          connectToWhatsApp();
        } else {
          const NOTIFICATION_TITLE = 'خدمة الواتساب'
          const NOTIFICATION_BODY = 'خدمة الواتساب غير متاحة حالياً!'
          new Notification({
            title: NOTIFICATION_TITLE,
            body: NOTIFICATION_BODY
          }).show()
          console.log('Logged out. Deleting session folder...');
          fs.removeSync(sessionPath);
          lastStatus = 'disconnected';
          lastUserInfo = null;
        }

        mainWindow.webContents.send('whatsapp-status', 'disconnected');
      }
    }
  });

  socket.ev.on('creds.update', saveCreds);
  sock = socket;
  return socket;
}





/**
 * Creates the main application window.
 */
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 940,
    height: 750,
    show: false,
    autoHideMenuBar: true,
    center: true,
    title: 'سراج سوفت',
    frame: process.platform !== 'win32',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    transparent: process.platform === 'darwin', // Enable only on macOS
    trafficLightPosition: { y: 15, x: 10 },
    icon: './assets/mac_icon.icns',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  //mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // Load the renderer URL in development or local HTML in production
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

const isConnected = () => {
  return sock?.user ? true : false;
};

/**
 * Sets up application event listeners and initializes the application.
 */
app.whenReady().then(() => {
  // Set app user model ID for Windows
  electronApp.setAppUserModelId('com.electron');

  // Watch shortcuts in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Handle IPC communication
  ipcMain.on('ping', () => console.log('pong'));

  // Create the main window
  createWindow();

  ipcMain.on('reconnect', () => {
    console.log('Reconnection triggered by renderer process');
    connectToWhatsApp().catch((err) =>
      console.error('WhatsApp Reconnection Failed:', err)
    );
  });

  ipcMain.on('clear-session', () => {
    const sessionPath = path.join(app.getPath('userData'), 'auth_info_baileys');
    if (fs.existsSync(sessionPath)) {
      fs.removeSync(sessionPath);
      console.log('Session cleared.');
    }
  });

  // Initialize WhatsApp functionality
  connectToWhatsApp().catch((err) =>
    console.error('WhatsApp Initialization Failed:', err)
  );

  // Respond to renderer requests for the last status
  ipcMain.handle('get-last-status', () => ({
    status: lastStatus,
    userInfo: lastUserInfo,
  }));

  // Handle notifications from the renderer process
  ipcMain.on('send-notification', (event, { title, body }) => {
    const notification = new Notification({ title, body });
    notification.show();
  });

  // Handle data storge
  ipcMain.on('send-storage-data', (event, { key, value }) => {


    // Send the value back to the child process
    if (serverProcess.send) {
      serverProcess.send({
        type: 'local-storage-response',
        title: key,
        value,
      });
    }
  });



  serverProcess.on('message', async (msg: { type: string; title?: string; message?: string }) => {
    if (msg.type === 'notify-main' && msg.title && msg.message) {

      new Notification({ title: msg.title, body: msg.message }).show();
    }

    if (msg.type === 'send-whatsapp-message') {

      let numberWA;

      let success = false;
      let response = 'ok';

      try {
        numberWA = "967" + msg.title + "@s.whatsapp.net";

        if (isConnected()) {
          const exist = await sock.onWhatsApp(numberWA);

          if (exist?.jid || (exist && exist[0]?.jid)) {
            const jid = exist.jid || exist[0].jid

            await sock.presenceSubscribe(jid)
            await delay(500)

            await sock.sendPresenceUpdate('composing', jid)
            await delay(2000)

            await sock.sendPresenceUpdate('paused', jid)

            await sock.sendMessage(jid, {
              text: msg.message,
            })

            success = true
          } else {
            success = false
            response = 'رقم المستلم ليس لديه حساب واتس'
          }
        } else {
          success = false
          response = 'لم نتمكن من إرسال رسالة الواتساب لأنك غير متصل'
        }
      } catch (err) {
        success = false
        response = 'خطأ غير متوقع'
      }


      // Send the value back to the child process
      if (serverProcess.send) {
        serverProcess.send({
          type: 'send-whatsapp-response',
          success: success,
          data: response,
        });
      }
    }
  });

  // macOS-specific behavior
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 *  const key = msg.title

      mainWindow?.webContents
        .executeJavaScript(`localStorage.getItem("${key}");`, true)
        .then(result => {
          // Retrieve the value from localStorage
          const value = result;

          console.log(`Value for ${key}: ${value}`);

          // Send the value back to the child process
          if (serverProcess.send) {
            serverProcess.send({
              type: 'local-storage-response',
              title: key,
              value,
            });
          }
        });
 */


