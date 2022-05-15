const { isAuthenticated, isAdmin } = require('../util/auth');

module.exports.getWelcomePage = (req, res, next) => {
    isAdmin(req, isAnAdmin => {
        res.render('welcome' , { 
            pageTitle: 'Welcome Page',
            page: 'welcome',
            isAuthenticated: isAuthenticated(req),
            isAdmin: isAnAdmin,
        });
    })
};