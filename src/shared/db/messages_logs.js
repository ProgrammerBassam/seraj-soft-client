const db = require('./db');

function addMessageLog(mobile, message, sent_date, message_type, status, info) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO msgs_logs (mobile, message, sent_date, message_type, status, info) VALUES (?, ?, ?, ?, ?, ?)`;

        db.run(query, [mobile, message, sent_date, message_type, status, info], function (err) {
            if (err) {
                reject(err); // Reject the promise with the error
            } else {
                resolve({ id: this.lastID }); // Resolve the promise with the last inserted ID
            }
        });
    });
}

module.exports = { addMessageLog }
