/**
 * @file Archivo que encapsula en un objeto las 4 funcionalidades del sistema
 * @author Alan Barahona
 */

const login = require('./login');
const authorize = require('./authorize');
const verify = require('./verify');
const logout = require('./logout');

const auth2 = {
    login,
    authorize,
    verify,
    logout
}

module.exports = auth2;