import { ipcMain } from 'electron';

export function setupApiHandlers() {
    // Example: Get data handler
    ipcMain.handle('api:getData', async (event, args) => {
        console.log('Received args:', args);
        return { message: 'Hello from the Main Process!', args };
    });

    // Example: Save data handler
    ipcMain.handle('api:saveData', async (event, data) => {
        console.log('Saving data:', data);
        return { status: 'success' };
    });
}
