const admin = require('firebase-admin');

const verify = (req, res) => {
    if (!req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(400).send();
    }
    const token = req.cookies.DIINFAUTH2USERTOKEN;
    admin.auth().verifySessionCookie(token, true).then((decodedClaims) => {
        res.status(200).json(decodedClaims);
    }).catch((error) => {
        res.status(400).send();
    })
}

module.exports = verify;