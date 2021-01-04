const searchUser = require('./searchUser');

// Obtención de grupos a partir de la respuesta de LDAP.
const searchGroup = async (email) => {
    const groups = [];
    const result = await searchUser(email);
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

module.exports = searchGroup;