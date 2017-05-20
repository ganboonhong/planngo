'use strict';
const app = require('./app');
const PORT = process.env.PORT || 443;

const http = require('http');
const https = require('https');

http.createServer(app).listen(80);
https.createServer(app).listen(443);

// app.listen(PORT, ()=>{
//     console.log(`App listening on port ${PORT}!`);
// })