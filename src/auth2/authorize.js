const admin = require('firebase-admin');
const searchGroup = require('./ldap/searchGroup');

const authorize = (req, res) => {
    if (!req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(401).send();
    }
    const token = req.cookies.DIINFAUTH2USERTOKEN;
    admin.auth().verifySessionCookie(token, true).then((decodedClaims) => {
        searchGroup(decodedClaims.email).then(result => {
            const body = { user: decodedClaims, result }
            res.status(200).json(body);
        });
    }).catch((error) => {
        res.status(400).send();
    })

}

module.exports = authorize;