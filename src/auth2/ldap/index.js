const ldapjs = require('ldapjs');

const url = process.env.URL || 'ldaps://10.0.2.15';

class LdapClient {
    constructor() {
        // Cliente LDAP, necesario para conectarse al directorio.
        return ldapjs.createClient({
            url,
            tlsOptions: {
                rejectUnauthorized: false
            }
        });
    }
}

module.exports = new LdapClient();