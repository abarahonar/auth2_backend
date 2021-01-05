const searchGroup = require('./searchGroup');

const exists = async (email) => {
    const result = await searchGroup(email);
    return result.length > 0;
}

module.exports = exists;