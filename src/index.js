/**
 * @file Archivo encargado de levantar el servidor https y conectarse
 * con Firebase
 * 
 * Se requiere de 3 archivos para que funcionen: ./assets/key.json obtenido a
 * partir de la consola de Firebase, ./src/assets/server.key y
 * ./src/assets/server.cert que corresponden a la llave y el certificado ssl
 * respectivamente
 * 
 * El objeto con el que se inicializa la variable admin debe ser editado
 * para que funcione con la instancia de Firebase propia
 * 
 * @author Alan Barahona
 */

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

const privateKey = fs.readFileSync('./src/assets/server.key', 'utf-8');
const certificate = fs.readFileSync('./src/assets/server.cert', 'utf-8');
const credentials = {
    key: privateKey,
    cert: certificate
};

const httpsServer = https.createServer(credentials, app);
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || 'testing.com';
httpsServer.listen(port, () => {
    console.log(`Listening on port ${ port } and domain ${ domain }`);
    if (process.env.PRODUCTION) {
        console.log('Production mode enabled');
    }
});