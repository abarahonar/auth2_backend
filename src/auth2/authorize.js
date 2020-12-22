const admin = require('firebase-admin');

const authorize = (req, res) => {
    if (!req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(401).send();
    }
    res.status(200).send('Por implementar');
}

module.exports = authorize;