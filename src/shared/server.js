const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const { exec } = require('child_process');
const timeout = require('connect-timeout');
const store = require('store2');

const app = express();
const PORT = 65531;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*", methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' }));
app.use(helmet());
app.use(logger('common'));
app.use('/api/v1', timeout('30s'));

// Routes
app.use('/api/v1', require('./routes/routes'));

// Start the server and handle errors
const server = app.listen(PORT, () => {
    // console.log(Express server running on http://localhost:${PORT});
});

// Handle server-level errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        //  console.error(Port ${ PORT } is already in use.Attempting to resolve...);

        // Find and kill the process using the port
        killProcessOnPort(PORT, () => {
            //    console.log(Retrying to start server on port ${ PORT }...);
            server.listen(PORT); // Retry starting the server
        });
    } else {
        //  console.error(Server error: ${ err.message });
    }
});

// Gracefully handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

// Utility function to kill the process using the port
function killProcessOnPort(port, callback) {
    const platform = process.platform;
    const command =
        platform === 'win32'
            ? 'netstat - ano | findstr : ${ port }' // Windows
            : 'lsof -i tcp:${ port }'; // macOS/Linux

    exec(command, (err, stdout) => {
        if (err) {
            //  console.error(Error finding process on port ${ port }:, err);
            return callback();
        }

        const processId = getProcessIdFromOutput(stdout, platform);
        if (processId) {
            //    console.log(Killing process with PID ${ processId }...);
            const killCommand =
                platform === 'win32' ? 'taskkill / PID ${ processId } /F' : 'kill -9 ${processId}';
            exec(killCommand, (killErr) => {
                if (killErr) {
                    //   console.error(Error killing process ${ processId }:, killErr);
                } else {
                    //  console.log(Process ${ processId } killed.);
                }
                callback();
            });
        } else {
            // console.log(No process found on port ${ port }.);
            callback();
        }
    });
}

// Helper function to extract process ID from command output
function getProcessIdFromOutput(output, platform) {
    if (platform === 'win32') {
        const match = output.match(/\s+(\d+)\s*LISTENING/); // Match PID from Windows output
        return match ? match[1] : null;
    } else {
        const lines = output.split('\n');
        const match = lines[1]?.split(/\s+/)[1]; // Extract PID from macOS/Linux output
        return match || null;
    }
}

process.on('message', (msg) => {
    if (msg.type === 'local-storage-response') {
        store.set(msg.title, msg.value)
    }
});