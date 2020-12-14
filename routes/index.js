const express = require('express');
const cors = require('cors');
const router = express.Router();
const options = require('../cors');

router.get('/', cors(), (req, res) => {
    res.send('Hello from HTTPS');
});

router.post('/login', cors(options), (req, res) => {
    if (req.cookies.name) {
        return res.status(400).send();
    }
    res.cookie('name', 'value', {
        secure: true,
        domain: 'testing.com',
        maxAge: 3600000
    }).status(200).send();
});

router.get('/authorize', cors(options), (req, res) => {
    if (!req.cookies.name) {
        return res.status(401).send();
    }
    res.status(200).send('Por implementar');
})

router.get('/verify', cors(options), (req, res) => {
    console.log(req.cookies);
    if (!req.cookies.name) {
        return res.status(400).send();
    }
    res.status(200).send(req.cookies.name);
});

router.options('/logout', cors(options), (req, res, next) => {
    next();
})
router.delete('/logout', cors(options), (req, res) => {
    console.log(req.cookies);
    if (!req.cookies.name) {
        return res.status(400).send();
    }
    res.clearCookie('name', {
        domain: 'testing.com',
        path: '/'
    }).status(200).send();
});

module.exports = router;
