const { isAuthenticated, getConnectedUserLogin, isAdmin } = require('../util/auth');
const User = require('../models/user');

module.exports.getUsersPage = (req, res) => {
    getUsers(req, res);
};

module.exports.getUserProfilePage = (req, res) => {
    User.getUserByLogin(getConnectedUserLogin(req))
    .then(([data, _]) => {
        res.render('user-profile' , { 
            pageTitle: 'User Profile Page',
            page: '',
            user: data[0],
            isAuthenticated: isAuthenticated(req),
            isAdmin: data[0].role === 'ADMIN',
        });
    });
};

module.exports.save = (req, res) => {
    const {firstname, lastname, login, role, postAction} = req.body;
    const user = new User(firstname, lastname, login, role);

    if(postAction === 'update'){
        res.statusCode = 200;
        user.update().then(() => {
            getUsers(req, res);
        }).catch(err => {console.log(err)});
    } else {
        res.statusCode = 201;
        user.add().then(() => {
            getUsers(req, res);
        }).catch(err => {console.log(err)});
   }
}

const getUsers = (req, res) => {
    User.getUsers().then(([data, _]) => {
        isAdmin(req, isAnAdmin => {
            res.render('users', {
                users: data,
                pageTitle: 'Users Page',
                page: 'users',
                isAuthenticated: isAuthenticated(req),
                isAdmin: isAnAdmin,
            });
        });
    }).catch(err => {console.log(err)});
}

module.exports.delete = (req, res) => {
    const login = req.url.split('login=')[1];
    User.delete(login, () => {
        res.setHeader('Content-Type', 'text/plain');
        res.end('success');
    });
}