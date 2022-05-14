const { isAuthenticated, getConnectedUserLogin } = require('../util/auth');
const User = require('../models/user');

module.exports.getUsersPage = (req, res) => {
    User.getUsers(data => {
        res.render('users' , { 
            pageTitle: 'Users Page',
            page: 'users',
            users: data,
            isAuthenticated: isAuthenticated(req),
        });
    });
};

module.exports.getUserProfilePage = (req, res) => {
    User.getUserByLogin(getConnectedUserLogin(req), user => {
        res.render('user-profile' , { 
            pageTitle: 'User Profile Page',
            page: '',
            user: user,
            isAuthenticated: isAuthenticated(req),
        });
    });
};

module.exports.save = (req, res) => {
    const {firstname, lastname, login, postAction} = req.body;
    const user = new User(firstname, lastname, login);

    if(postAction === 'update'){
        res.statusCode = 200;
        user.update(() => {
            User.getUsers(data => {
                res.render('users', {
                    users: data,
                    pageTitle: 'Users Page',
                    page: 'users',
                    isAuthenticated: isAuthenticated(req),
                });
            });
        });
    } else {
        res.statusCode = 201;
        user.add(() => {
            User.getUsers(data => {
                res.render('users', {
                    users: data,
                    pageTitle: 'Users Page',
                    page: 'users',
                    isAuthenticated: isAuthenticated(req),
                });
            });
        });
   }
}

module.exports.delete = (req, res) => {
    const login = req.url.split('login=')[1];
    User.delete(login, () => {
        res.setHeader('Content-Type', 'text/plain');
        res.end('success');
    });
}