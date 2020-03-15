const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const pwdHash = await bcrypt.hash(password, salt);
    return pwdHash;
};

helpers.comparePassword = async (password, savedPwd) => {
    try {
        return await bcrypt.compare(password, savedPwd);
    } catch(err) {
        console.log(err);
    }
};

module.exports = helpers;