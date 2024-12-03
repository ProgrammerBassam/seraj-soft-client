const { ipcMain } = require('electron');


const NotificationService = {
    sendNotification: (title, message) => {
        if (typeof window !== 'undefined' && window.context) {
            window.context.sendNotification(title, message);
        } else {
            console.log(`[${title}] ${message}`);
        }
    }
};

NotificationService.sendNotification('إرسال واتساب', 'Message content');
