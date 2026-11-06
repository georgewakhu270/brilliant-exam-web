const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000
const {DatabaseSync} = require('node:sqlite')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}))

const db = new DatabaseSync('database.db')
db.exec(
    'CREATE TABLE IF NOT EXISTS orders (school TEXT, county TEXT, village TEXT, email TEXT, message TEXT) '
)

const insertOrder = db.prepare(`
    INSERT INTO orders (school, county, village, email, message) 
    VALUES (?, ?, ?, ?, ?)
`);

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/order', (req, res) => {
    const success = req.session.success
    delete req.session.success
    res.render('order', { success })
})

app.post('/order', express.urlencoded({ extended: true }), (req, res) => {
    const { school, county, village, email, message } = req.body
    insertOrder.run(school, county, village, email, message)

    req.session.success = true

    res.redirect('/order')
})

app.get('/compensation', (req, res) => {
    res.render('compensation')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/admin', (req, res) => {
    const orders = db.prepare('SELECT * FROM orders').all()
    res.render('admin', { orders })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
