// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');


// Get our API routes
const api = require('./server/routes/api');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/citasv2');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// for session handling
app.use(session({ path: '/', httpOnly: true, secret: 'wuhooooooooo0', secure: false, maxAge: null, resave: true, saveUninitialized: true }));

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