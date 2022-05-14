const { isAuthenticated } = require('../util/auth');

module.exports.getUsersPage = (req, res) => {
    res.render('users' , { 
        pageTitle: 'Users Page',
        page: 'users',
        isAuthenticated: isAuthenticated(req),
    });
};

module.exports.getUserProfilePage = (req, res) => {
    res.render('user-profile' , { 
        pageTitle: 'User Profile Page',
        page: '',
        isAuthenticated: isAuthenticated(req),
    });
};