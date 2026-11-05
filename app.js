const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/order', (req, res) => {
    res.render('order')
})

app.get('/compensation', (req, res) => {
    res.render('compensation')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
