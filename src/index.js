const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const https = require('https');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(require('./assets/key.json')),
    databaseURL: 'https://tingeso-55880.firebaseio.com'
});

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(require('./routes'));
app.use(express.json());

const port = process.env.PORT || 3000;
const privateKey = fs.readFileSync('./src/assets/server.key', 'utf-8');
const certificate = fs.readFileSync('./src/assets/server.cert', 'utf-8');
const credentials = {
    key: privateKey,
    cert: certificate
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
    if (process.env.PRODUCTION) {
        console.log('Production mode enabled');
    }
});