const admin = require('firebase-admin');
const domain = process.env.DOMAIN || 'testing.com';

/**
 * Función encargada de eliminar la cookie en el navegador.
 * 
 * @param {*} req Request de la petición HTTP, debe contener la cookie
 * @param {*} res Response de la petición HTTP
 * @exports logout
 * @author Alan Barahona
 */
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
            path: '/' // En caso de que ambas cosas no se expliciten, no se elimina la cookie
        }).status(200).send();
    });
}

module.exports = logout;