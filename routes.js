const express = require('express');
const router = express.Router();
const { db, insertOrder, insertCompensation } = require('./database');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/order', (req, res) => {
    const success = req.session.success;
    delete req.session.success;
    res.render('order', { success });
});

router.post('/order', (req, res) => {
    const { school, county, village, email, message } = req.body;
    insertOrder.run(school, county, village, email, message);
    req.session.success = true;
    res.redirect('/order');
});

router.get('/compensation', (req, res) => {
    const success = req.session.success;
    delete req.session.success;
    res.render('compensation', { success });
});

router.post('/compensation', (req, res) => {
    const { fullname, phonenumber, transaction, amount, service, date, description, resolution } = req.body;
    insertCompensation.run(fullname, phonenumber, transaction, amount, service, date, description, resolution); 
    req.session.success = true;  
    res.redirect('/compensation')
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/admin', (req, res) => {
    const orders = db.prepare('SELECT * FROM orders').all();
    res.render('admin', { orders });
});

module.exports = router;
