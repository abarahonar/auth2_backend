const express = require('express');
const cors = require('cors');
const options = require('./cors');
const auth2 = require('./auth2');

const router = express.Router();

router.get('/', cors(), (req, res) => {
    auth2.doc(req, res);
});

router.options('/login', cors(options));
router.post('/login', cors(options), (req, res) => {
    auth2.login(req, res);
});

router.get('/authorize', cors(options), (req, res) => {
    auth2.authorize(req, res);
})

router.get('/verify', cors(options), (req, res) => {
    auth2.verify(req, res);
});

router.options('/logout', cors(options));
router.delete('/logout', cors(options), (req, res) => {
    auth2.logout(req, res);
});

module.exports = router;
