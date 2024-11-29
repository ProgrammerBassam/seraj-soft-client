export const validateAppCode = async (appCode: string): Promise<{ status: string }> => {
    // Simulated API request (replace with real API logic)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (appCode.length === 10) {
                resolve({ status: 'ok' });
            } else {
                reject(new Error('Invalid app code.'));
            }
        }, 2000);
    });
};
