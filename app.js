const express = require('express');
const session = require('express-session');
const routes = require('./routes');

const app = express();
const port = 3000;

// App Settings & Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Mount Routes
app.use('/', routes);

// Start Server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});