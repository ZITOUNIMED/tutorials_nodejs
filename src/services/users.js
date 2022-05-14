const User = require('../models/user');

module.exports.getUserByLogin = (login, callback) => {
    User.getUserByLogin(login, user => {
        callback(user);
    })
}