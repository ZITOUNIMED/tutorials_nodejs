const loginRoutes = (req, res) => {
    if(req.method === 'POST'){
        res.statusCode = 302;
        const data = [];
        req.on('data', chunck => {
            data.push(chunck);
        });
    
        req.on('end', () => {
            const parsedData = Buffer.concat(data).toString();
            const {login, password} = parseConnectionData(parsedData);
            if(login && login.length>2 && password && password.length>2){
                res.setHeader('Location', '/product');
            } else {
                res.setHeader('Location', '/connection');
            }
            res.end();
        });
    }
};

const parseConnectionData = parsedData => {
    const list = parsedData.split('&');
    const login = list[0].split('=')[1];
    const password = list[1].split('=')[1];
    return {login, password};
}

exports.loginRoutes = loginRoutes;