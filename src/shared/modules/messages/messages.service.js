const SendWhatsApp = (receipt, msg) => {
    return new Promise((resolve, reject) => {
        try {

            const title = receipt
            const message = msg

            // Send the initial message to the main process
            if (process.send) {
                process.send({ type: 'send-whatsapp-message', title, message });
            } else {
                return reject(new Error('process.send is not available'));
            }

            // Listen for the response from the main process
            process.on('message', (response) => {
                if (response.type === 'send-whatsapp-response') {
                    // Resolve the promise with the response data
                    resolve({
                        success: response.success || false,
                        data: response.message || 'Unknown response',
                    });
                }
            });
        } catch (error) {
            reject(error); // Reject the promise in case of an error
        }
    });
};

module.exports = { SendWhatsApp };
