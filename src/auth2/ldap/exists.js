const searchGroup = require('./searchGroup');

const exists = async (email) => {
    searchGroup(email).then(result => {
        return result.length > 0;
    });
}

module.exports = exists;