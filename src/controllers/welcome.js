module.exports.getWelcomePage = (req, res, next) => {
    res.render('welcome' , { 
        pageTitle: 'Welcome Page',
        page: 'welcome'
    });
};