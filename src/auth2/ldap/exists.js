const searchGroup = require('./searchGroup');

/**
 * Descripcion Funcion asincrona
 * @param {string} email que es esto
 * @author Roberto Lillo
 * @exports exists
 */
const exists = async (email) => {
    try {
        const result = await searchGroup(email);
        return result.length > 0;
    }
    catch (err) {
        throw err;
    }
}

module.exports = exists;