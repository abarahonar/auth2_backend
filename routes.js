const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from HTTPS');
});

router.get('/set', (req, res) => {
    res.writeHead(200, {
        'Set-Cookie': 'name=key_value; secure;domain=testing.com'
    }).send();
});


router.get('/get', (req, res) => {
    if (!req.cookies.name) {
        return res.status(401).send();
    }
    console.log(req.cookies);
    res.status(200).send();
})

module.exports = router;