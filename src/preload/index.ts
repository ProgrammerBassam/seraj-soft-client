import { contextBridge, ipcRenderer } from 'electron';

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow');
}

type UserInfo = {
  name: string; // The user's name
  phone: string; // The user's phone number
  profilePicture?: string; // URL to the profile picture
};


try {
  // Expose API to the renderer process
  contextBridge.exposeInMainWorld('context', {
    onQRCode: (callback: (qr: string) => void) => {
      ipcRenderer.on('qr-code', (_, qr: string) => callback(qr));
    },
    onStatusChange: (callback: (status: string) => void) => {
      ipcRenderer.on('whatsapp-status', (_, status: string) => callback(status));
    },
    reconnect: () => ipcRenderer.send('reconnect'),
    clearSession: () => ipcRenderer.send('clear-session'),
    onUserInfo: (callback: (userInfo: UserInfo) => void) =>
      ipcRenderer.on('whatsapp-user-info', (_, userInfo: UserInfo) => callback(userInfo)),
    getLastStatus: () => ipcRenderer.invoke('get-last-status'),
    sendNotification: (title, body) => ipcRenderer.send('send-notification', { title, body }),
    sendStorageData: (key, value) => ipcRenderer.send('send-storage-data', { key, value }),
  });
} catch (error) {
  console.error(error);
}
