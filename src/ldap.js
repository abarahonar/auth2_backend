const ldapjs = require('ldapjs');

class LdapClient {
    constructor() {
        // Cliente LDAP, necesario para conectarse al directorio.
        return ldapjs.createClient({
            url: 'ldaps://10.0.2.15',
            tlsOptions: {
                rejectUnauthorized: false
            }
        });
    }
}

module.exports = new LdapClient();