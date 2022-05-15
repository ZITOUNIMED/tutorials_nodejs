const User = require('../models/user');

module.exports.getUserByLogin = (login) => {
    return User.getUserByLogin(login);
}