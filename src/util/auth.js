const { getUserByLogin } = require('../services/users');

module.exports.isAuthenticated = (req) => {
    return extractCookies(req.get('Cookie')).isAuthenticated === 'true';
}

module.exports.getConnectedUserLogin = (req) => {
    return extractCookies(req.get('Cookie')).login
}

module.exports.isUserExisting = (login, callback) => {
    getUserByLogin(login).then(users => {
        if(users && users.length>0){
            callback(true);
        } else {
            callback(false);
        }
    });
}

module.exports.isAdmin = (req, callback) => {
    const login = extractCookies(req.get('Cookie')).login;

    if(login){
        getUserByLogin(login).then(data => {
            if(data && data[0] && data[0].role === 'ADMIN'){
                callback(true);
            } else {
                callback(false);
            }
        }).catch(err => {console.log(err)});
    } else {
        callback(false);
    }
}


module.exports.isAdminConnected = (req, res, next) => {
    const login = extractCookies(req.get('Cookie')).login;

    getUserByLogin(login).then(data => {
        if(data && data[0] && data[0].role === 'ADMIN'){
            next();
        } else {
            res.render('error' , { 
                pageTitle: 'Error Page',
                page: '',
                user: data && data[0],
                isAuthenticated: extractCookies(req.get('Cookie')).isAuthenticated === 'true',
                isAdmin: false,
            });
        }
    }).catch(err => {console.log(err)});
}

const extractCookies = cookiesStr => {
    const cookiesObj = {};
    try {
        cookiesStr.split(';').map(c => c.trim()).forEach(c => {
            const key = c.split('=')[0];
            const value = c.split('=')[1];
            cookiesObj[key]=value;
        });
    } catch(err) {
        console.log('Cookies not found!')
    }
    
    return cookiesObj;
}
