const { isUserExisting } = require('../util/auth');

module.exports.signIn = (req, res) => {
    const {login, password} = req.body;

    isUserExisting(login, isExisting => {
        if(isExisting){
            res.cookie('isAuthenticated', true);
            res.cookie('login', login);
            res.redirect(302, '/product');
        } else {
            res.cookie('isAuthenticated', false);
            res.cookie('login', '');
            res.redirect(302, '/connection');
        }
        res.end();
    })
};