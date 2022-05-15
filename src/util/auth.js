const { getUserByLogin } = require('../services/users');

module.exports.isAuthenticated = (req) => {
    return extractCookies(req.get('Cookie')).isAuthenticated === 'true';
}

module.exports.getConnectedUserLogin = (req) => {
    return extractCookies(req.get('Cookie')).login
}

module.exports.isUserExisting = (login, callback) => {
    getUserByLogin(login, user => {
        if(!!user){
            callback(true);
        } else {
            callback(false);
        }
    });
}

module.exports.isAdmin = (req, callback) => {
    const login = extractCookies(req.get('Cookie')).login;

    getUserByLogin(login, user => {
        if(user && user.role === 'ADMIN'){
            callback(true);
        } else {
            callback(false);
        }
    });
}


module.exports.isAdminConnected = (req, res, next) => {
    const login = extractCookies(req.get('Cookie')).login;

    getUserByLogin(login, user => {
        if(user && user.role === 'ADMIN'){
            next();
        } else {
            res.render('error' , { 
                pageTitle: 'Error Page',
                page: '',
                user: user,
                isAuthenticated: extractCookies(req.get('Cookie')).isAuthenticated === 'true',
                isAdmin: false,
            });
        }
    });
    
}

const extractCookies = cookiesStr => {
    const cookiesObj = {};
    cookiesStr.split(';').map(c => c.trim()).forEach(c => {
        const key = c.split('=')[0];
        const value = c.split('=')[1];
        cookiesObj[key]=value;
    });
    return cookiesObj;
}
