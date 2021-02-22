/**
 * @file Archivo encargado de definir las rutas y las funciones asociadas
 * a cada ruta
 * @author Alan Barahona
 */

const express = require('express');
const cors = require('cors');
const settings = require('./cors');
const auth2 = require('./auth2');

const router = express.Router();
const corsSettings = cors(settings);

//Ruta de autenticacion
router.options('/login', corsSettings);
router.post('/login', corsSettings, (req, res) => {
    auth2.login(req, res);
});

//Ruta de autorizacion
router.options('/authorize', cors());
router.post('/authorize', cors(), (req, res) => {
    auth2.authorize(req, res);
});

//Ruta de verificacion
router.get('/verify', corsSettings, (req, res) => {
    auth2.verify(req, res);
});

//Ruta de desautenticacion
router.options('/logout', corsSettings);
router.delete('/logout', corsSettings, (req, res) => {
    auth2.logout(req, res);
});

module.exports = router;
