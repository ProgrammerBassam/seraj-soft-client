import { ipcMain } from 'electron';
import express from 'express';
import { getAllMacAddresses, getCurrentMacAddress } from './mac';

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


    // Create an Express app
    const app = express();
    app.use(express.json()); // Middleware to parse JSON requests

    // Define an HTTP route
    app.get('/api/data', (req, res) => {
        res.json({ message: 'Hello from HTTP API!' });
    });

    app.post('/api/data', (req, res) => {
        console.log('Received data:', req.body);
        res.json({ status: 'success', received: req.body });
    });

    // Start the server
    const PORT = 65531;
    app.listen(PORT, () => {
        console.log(`HTTP server running on http://localhost:${PORT}`);
    });
}

export function setupMacApiHandlers() {
    ipcMain.handle('api:getAllMacAddresses', async () => {
        return getAllMacAddresses();
    });

    ipcMain.handle('api:getCurrentMacAddress', async () => {
        return getCurrentMacAddress();
    });
}
