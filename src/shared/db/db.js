const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to a database file
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create a table if it doesn't exist
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS msgs_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mobile TEXT NOT NULL,
        message TEXT NOT NULL,
        sent_date TEXT NOT NULL,
        message_type INTEGER NOT NULL,
        info TEXT,
        status INTEGER NOT NULL DEFAULT 0 -- Use 0 for false and 1 for true
      )`,
        (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Messages Logs table ensured');
            }
        }
    );
});

module.exports = db;
