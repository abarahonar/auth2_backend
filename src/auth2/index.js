const login = require('./login');
const authorize = require('./authorize');
const verify = require('./verify');
const logout = require('./logout');
const doc = require('./doc');

const auth2 = {
    login,
    authorize,
    verify,
    logout,
    doc
}

module.exports = auth2;