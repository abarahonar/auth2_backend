const admin = require('firebase-admin');
const domain = process.env.DOMAIN || 'testing.com';

const login = (req, res) => {
    if (req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(400).send();
    }
    const { idToken } = req.body;
    const expiresIn = 432000000; // 5 dias
    admin.auth().createSessionCookie(idToken, { expiresIn }).then((sessionCookie) => {
        res.cookie('DIINFAUTH2USERTOKEN', sessionCookie, {
            secure: true,
            httpOnly: true,
            domain,
            maxAge: expiresIn,
        }).status(200).send();
    }, (error) => {
        res.status(401).send();
    });
}

module.exports = login;