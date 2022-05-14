const { isAuthenticated } = require('../util/auth');

module.exports.getWelcomePage = (req, res, next) => {
    res.render('welcome' , { 
        pageTitle: 'Welcome Page',
        page: 'welcome',
        isAuthenticated: isAuthenticated(req),
    });
};