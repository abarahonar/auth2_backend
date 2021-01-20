const admin = require('firebase-admin');

/**
 * Función encargada de verificar la cookie en el navegador.
 * 
 * @param {*} req Request de la petición HTTP, debe contener la cookie
 * @param {*} res Response de la petición HTTP, retorna un objeto del tipo
 * DecodedIdToken que contiene informacion del usuario, referirse a
 * https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken
 * @exports verify
 * @author Alan Barahona
 */
const verify = (req, res) => {
    if (!req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(400).send();
    }
    const token = req.cookies.DIINFAUTH2USERTOKEN;
    admin.auth().verifySessionCookie(token, true).then((decodedClaims) => {
        res.status(200).json(decodedClaims);
    }).catch((error) => {
        res.status(401).send();
    })
}

module.exports = verify;