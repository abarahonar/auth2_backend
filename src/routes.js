const express = require('express');
const cors = require('cors');
const settings = require('./cors');
const auth2 = require('./auth2');

const router = express.Router();
const corsSettings = cors(settings);

router.get('/', cors(), (req, res) => {
    auth2.doc(req, res);
});

router.options('/login', corsSettings);
router.post('/login', corsSettings, (req, res) => {
    auth2.login(req, res);
});

router.options('/authorize', corsSettings);
router.post('/authorize', corsSettings, (req, res) => {
    auth2.authorize(req, res);
});

router.get('/verify', corsSettings, (req, res) => {
    auth2.verify(req, res);
});

router.options('/logout', corsSettings);
router.delete('/logout', corsSettings, (req, res) => {
    auth2.logout(req, res);
});

module.exports = router;
