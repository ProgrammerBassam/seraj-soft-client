import { useEffect, useState } from 'react';

export const useWhatsApp = () => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
    const [userInfo, setUserInfo] = useState<{ name: string; phone: string; profilePicture?: string } | null>(
        null
    );

    useEffect(() => {
        if (window.context) {
            // Fetch the last known status on load
            window.context.getLastStatus().then((data) => {
                if (data.status) setStatus(data.status);
                if (data.userInfo) setUserInfo(data.userInfo);
            });

            // Listen for QR code updates
            window.context.onQRCode((qr: string) => {
                setQrCode(qr);
            });

            // Listen for WhatsApp status updates
            window.context.onStatusChange((newStatus: string) => {
                setStatus(newStatus as 'connecting' | 'connected' | 'disconnected');
                if (newStatus !== 'connected') {
                    setUserInfo(null); // Clear user info if disconnected
                }
            });

            // Listen for user info updates
            window.context.onUserInfo((info: { name: string; phone: string; profilePicture?: string }) => {
                setUserInfo(info);
            });
        }
    }, []);

    return {
        qrCode,
        status,
        userInfo,
        setQrCode,
        setStatus,
    };
};
