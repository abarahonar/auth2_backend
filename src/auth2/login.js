const admin = require('firebase-admin');
const exists = require('./ldap/exists');

const domain = process.env.DOMAIN || 'testing.com';

const login = (req, res) => {
    if (req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(400).send();
    }
    const { idToken } = req.body;
    const expiresIn = 432000000; // 5 dias
    admin.auth().createSessionCookie(idToken, { expiresIn }).then((sessionCookie) => {
        admin.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
            exists(decodedClaims.email).then((isUser) => {
                if (isUser) {
                    res.cookie('DIINFAUTH2USERTOKEN', sessionCookie, {
                        secure: true,
                        httpOnly: true,
                        domain,
                        maxAge: expiresIn,
                    }).status(200).send();
                } else {
                    res.status(401).send();
                }
            });
        }).catch((error) => {
            res.status(401).send(error);
        });
    }).catch((error) => {
        res.status(500).send(error);
    });
}

module.exports = login;