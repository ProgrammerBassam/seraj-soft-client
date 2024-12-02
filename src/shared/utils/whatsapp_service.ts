import { DisconnectReason, makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { useWhatsApp } from '../../renderer/src/components/Whatsapp/WhatsAppContext';

export async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const socket = makeWASocket({
        auth: state,
        printQRInTerminal: false,
    });

    const { setQrCode, setStatus } = useWhatsApp();

    socket.ev.on('connection.update', (update) => {
        const { qr, connection, lastDisconnect } = update;

        if (connection === 'open') {
            console.log('Connected to WhatsApp!');
            setStatus('connected'); // Update global status
            setQrCode(null); // Clear QR code
        }

        if (qr) {
            console.log('New QR Code Generated:', qr);
            setQrCode(qr); // Update global QR code
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                connectToWhatsApp();
            }
            setStatus('disconnected'); // Update global status
        }
    });

    socket.ev.on('creds.update', saveCreds);

    return socket;
}
