const {DatabaseSync} = require('node:sqlite')

const db = new DatabaseSync('database.db')

// create tables

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        school TEXT, 
        county TEXT, 
        village TEXT, 
        email TEXT, 
        message TEXT
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS compensation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT,
        phonenumber TEXT,
        transaction_code TEXT,
        amount REAL,
        service TEXT,
        date TEXT DEFAULT CURRENT_TIMESTAMP,
        description TEXT,
        resolution TEXT
    )
`);

const insertOrder = db.prepare(`
    INSERT INTO orders (school, county, village, email, message) 
    VALUES (?, ?, ?, ?, ?)
`);

module.exports = { db, insertOrder };
