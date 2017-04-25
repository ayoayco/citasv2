// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionChecker = require('./server/sessionChecker');


// Get our API routes
const api = require('./server/routes/api');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/citasv2');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// for session handling
app.use(session({ path: '/', httpOnly: true, secret: 'secret', secure: false, maxAge: null, resave: true, saveUninitialized: true }));
app.use(cookieParser('secret'));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Web App and REST API running on localhost:${port}`));