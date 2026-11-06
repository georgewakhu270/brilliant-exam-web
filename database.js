const {DatabaseSync} = require('node:sqlite')

const db = new DatabaseSync('database.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        school TEXT, 
        county TEXT, 
        village TEXT, 
        email TEXT, 
        message TEXT
    )
`);

const insertOrder = db.prepare(`
    INSERT INTO orders (school, county, village, email, message) 
    VALUES (?, ?, ?, ?, ?)
`);

module.exports = { db, insertOrder };
