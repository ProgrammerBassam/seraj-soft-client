import { useEffect, useState } from 'react';

export const useWhatsAppStatus = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (window.context) {
            // Listen for status updates from the main process
            window.context.onStatusChange((status) => {
                setIsConnected(status === 'connected');
            });

            // Fetch the initial status when the component mounts
            window.context.getLastStatus().then((data) => {
                setIsConnected(data.status === 'connected');
            });
        }
    }, []);

    return { isConnected };
};
