import { DisconnectReason, makeWASocket, useMultiFileAuthState, delay } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { useWhatsApp } from '@renderer/components/Whatsapp/useWhatsApp';


let sock;

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
            setStatus('connected'); // Update global status
            setQrCode(null); // Clear QR code
        }

        if (qr) {
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

    sock = socket;

    return socket;
}

export async function sendMessage(receipt, body) {
    let numberWA;

    try {
        numberWA = "967" + receipt + "@s.whatsapp.net";

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
                    text: body,
                })

                return { success: true }
            } else {
                return { success: false, data: 'رقم المستلم ليس لديه حساب واتس' }
            }
        } else {
            return { success: false, data: 'لم نتمكن من إرسال رسالة الواتساب لأنك غير متصل' }
        }
    } catch (err) {
        return { success: false, data: err }
    }
}

const isConnected = () => {
    return sock?.user ? true : false;
};
