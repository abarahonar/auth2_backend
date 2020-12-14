const express = require('express');
const cors = require('cors');
const router = express.Router();
const options = require('../cors');

router.get('/', cors(), (req, res) => {
    res.send('Hello from HTTPS');
});

router.get('/set', cors(options), (req, res) => {
    res.writeHead(200, {
        'Set-Cookie': 'name=key_value; secure;domain=testing.com'
    }).send();
});

router.get('/get', cors(options), (req, res) => {
    if (!req.cookies.name) {
        return res.status(401).send();
    }
    console.log(req.cookies);
    res.status(200).send();
})

module.exports = router;