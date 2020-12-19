const express = require('express');
const cors = require('cors');
const router = express.Router();
const options = require('../cors');
const admin = require('firebase-admin');

router.get('/', cors(), (req, res) => {
    res.send('Hello from HTTPS');
});

router.options('/login', cors(options));
router.post('/login', cors(options), (req, res) => {
    if (req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(400).send();
    }
    const { idToken } = req.body;
    console.log(idToken);
    const expiresIn = 432000000; // 5 dias
    admin.auth().createSessionCookie(idToken, { expiresIn }).then((sessionCookie) => {
        res.cookie('DIINFAUTH2USERTOKEN', sessionCookie, {
            secure: true,
            httpOnly: true,
            domain: 'testing.com',
            maxAge: expiresIn,
        }).status(200).send();
    }, (error) => {
        res.status(401).send();
    });
});

router.get('/authorize', cors(options), (req, res) => {
    if (!req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(401).send();
    }
    res.status(200).send('Por implementar');
})

router.get('/verify', cors(options), (req, res) => {
    if (!req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(400).send();
    }
    const token = req.cookies.DIINFAUTH2USERTOKEN;
    admin.auth().verifySessionCookie(token, true).then((decodedClaims) => {
        res.status(200).json(decodedClaims);
    }).catch((error) => {
        res.status(400).send();
    })
});

router.options('/logout', cors(options));
router.delete('/logout', cors(options), (req, res) => {
    if (!req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(400).send();
    }
    const token = req.cookies.DIINFAUTH2USERTOKEN;
    admin.auth().verifySessionCookie(token, true).then((decodedClaims) => {
        admin.auth().revokeRefreshTokens(decodedClaims.sub);
    }).then(() => {
        res.clearCookie('DIINFAUTH2USERTOKEN ', {
            domain: 'testing.com',
            path: '/'
        }).status(200).send();
    })

});

module.exports = router;
