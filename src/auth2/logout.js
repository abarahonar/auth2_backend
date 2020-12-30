const admin = require('firebase-admin');
const domain = process.env.DOMAIN || 'testing.com';

const logout = (req, res) => {
    if (!req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(400).send();
    }
    const token = req.cookies.DIINFAUTH2USERTOKEN;
    admin.auth().verifySessionCookie(token, true).then((decodedClaims) => {
        admin.auth().revokeRefreshTokens(decodedClaims.sub);
    }).then(() => {
        res.clearCookie('DIINFAUTH2USERTOKEN ', {
            domain,
            path: '/'
        }).status(200).send();
    });
}

module.exports = logout;