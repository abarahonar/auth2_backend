const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const https = require('https');

const app = express();
app.use(cookieParser());
app.use(require('./routes'));

const port = process.env.PORT || 3000;
const privateKey = fs.readFileSync('./server.key', 'utf-8');
const certificate = fs.readFileSync('./server.cert', 'utf-8');
const credentials = {
    key: privateKey,
    cert: certificate
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);