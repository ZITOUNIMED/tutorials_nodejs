module.exports.signIn = (req, res) => {
    const {login, password} = req.body;

        if(login && login.length>2 && password && password.length>2){
            res.cookie('isAuthenticated', true);
            res.redirect(302, '/product');
        } else {
            res.cookie('isAuthenticated', false);
            res.redirect(302, '/connection');
        }
        res.end();
};