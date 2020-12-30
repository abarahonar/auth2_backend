const admin = require('firebase-admin');
const client = require('../ldap');

function searchUser(sAMAccountName) {
    return new Promise((resolve, reject) => {
        // Credenciales para el Bind.
        const credentials = {
            dc: 'DC=samba,DC=lan',
            dn: 'CN=Administrator,CN=Users,DC=samba,DC=lan',
            pass: 'Pingeso1*'
        };
//
        // Opciones de búsqueda.
        const opts = {
            filter: `(sAMAccountName=${sAMAccountName})`,
            scope: 'sub',
            attributes: ['cn', 'memberOf']
        };

        // Conexión con LDAP y búsqueda del usuario.
        client.bind(credentials.dn, credentials.pass, (err) => {
            if (err) {
                return err;
            }
            const results = [];
            client.search(credentials.dc, opts, (err, res) => {
                res.on('searchEntry', (entry) => {
                    results.push(entry.object);
                });
                res.on('error', (error) => {
                    console.log(`Error: ${error.message}`);
                    if (err) {
                        reject(err);
                    }
                });
                res.on('end', (result) => {
                    resolve(results);
                });
            });
        });
    });
}

// Obtención de grupos a partir de la respuesta de LDAP.
async function search(name) {
    const groups = [];
    const result = await searchUser(name);
    if (Array.isArray(result) && result.length) {
        const obj = result[0];
        if (Array.isArray(obj.memberOf)) {
            for (let i = 0; i < obj.memberOf.length; i++) {
                let group = obj.memberOf[i];
                let splitted = group.split(",");
                splitted = splitted[0].split("=");
                groups.push(splitted[1]);
            }
        } else {
            let splitted = obj.memberOf.split(",");
            splitted = splitted[0].split("=");
            groups.push(splitted[1]);
        }
    };
    return groups;
}

const authorize = (req, res) => {
    if (!req.cookies.DIINFAUTH2USERTOKEN) {
        return res.status(401).send();
    }
    const token = req.cookies.DIINFAUTH2USERTOKEN;
    admin.auth().verifySessionCookie(token, true).then((decodedClaims) => {
        search(decodedClaims.email).then(result => {
            const body = { user: decodedClaims, result }
            res.status(200).json(body);
        });
    }).catch((error) => {
        res.status(400).send();
    })

}

module.exports = authorize;