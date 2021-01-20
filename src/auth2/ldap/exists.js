const searchGroup = require('./searchGroup');

/**
 * Descripcion Funcion asincrona
 * @param {string} email que es esto
 * @author Roberto Lillo
 * @exports exists
 */
const exists = async (email) => {
    const result = await searchGroup(email);
    return result.length > 0;
}

module.exports = exists;