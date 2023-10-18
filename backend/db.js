/*
File for handling the database connection
*/

const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database('studybuddy.db', (err) => {
    if (err) {
        console.log('Error connecting to studdybuddy.db:', err.message);
    } else {
        console.log('Connected to Studdybuddy database');
    }
});

module.exports = db;