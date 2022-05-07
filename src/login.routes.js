const loginRoutes = (req, res) => {
    if(req.method === 'POST'){
        const {login, password} = req.body;

        if(login && login.length>2 && password && password.length>2){
            res.redirect(302, '/product');
        } else {
            res.redirect(302, '/connection');
        }
        res.end();
    }
};


exports.loginRoutes = loginRoutes;