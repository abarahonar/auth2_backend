const admin = require('firebase-admin');
const searchGroup = require('./ldap/searchGroup');

/**
 * Función encargada de autorizar un id asociado a un cookie. Se comunica con LDAP a traves de la funcion searchGroup
 * 
 * @param {*} req Request de la petición HTTP, debe contener en el body la variable idToken, la cual corresponde a la cookie
 * @param {*} res Response de la petición HTTP, envia un objeto que contine un arreglo con los roles y la informacion del usuario
 * como un objeto de la clase DecodedIdToken, referirse a
 * https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken
 * @exports authorize
 * @author Alan Barahona
 */
const authorize = (req, res) => {
    if (!req.body.idToken) {
        return res.status(400).send();
    }
    const token = req.body.idToken;
    admin.auth().verifySessionCookie(token, true).then((decodedClaims) => {
        searchGroup(decodedClaims.email).then(result => {
            const body = { user: decodedClaims, result }
            res.status(200).json(body);
        });
    }).catch((error) => {
        res.status(401).send();
    })

}

module.exports = authorize;