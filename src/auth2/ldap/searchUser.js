const ldapjs = require('ldapjs');

const pass = process.env.PASS || 'Pingeso1*';
const url = process.env.URL || 'ldaps://35.192.174.192';

/**
 * Descripcion
 * @param {string} sAMAccountName que es esto
 * @author Roberto Lillo
 * @exports searchUser
 */
const searchUser = (sAMAccountName) => {
    return new Promise((resolve, reject) => {
        // Credenciales para el Bind.
        const credentials = {
            dc: 'DC=samba,DC=lan',
            dn: 'CN=Administrator,CN=Users,DC=samba,DC=lan',
            pass
        };

        // Opciones de búsqueda.
        const opts = {
            filter: `(sAMAccountName=${sAMAccountName})`,
            scope: 'sub',
            attributes: ['cn', 'memberOf']
        };

        const client = ldapjs.createClient({
            url,
            tlsOptions: {
                rejectUnauthorized: false
            }
        });

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
                    client.unbind();
                    resolve(results);
                });
            });
        });
    });
}

module.exports = searchUser;