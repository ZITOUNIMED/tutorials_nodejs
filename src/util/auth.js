module.exports.isAuthenticated = (req) => {
    return req.get('Cookie').split('=')[1]==='true';
}