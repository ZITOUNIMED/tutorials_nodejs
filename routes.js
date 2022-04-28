const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    if(req.url === '/'){
        res.write('<html>');
        res.write('<head><title>Welcome Page</title></head><body>');
        res.write('<h2>Hello from the server!</h2>');
        res.write('</body></html>');
        res.end();
    } else if(req.url === '/connection'){
        res.write('<html>');
        res.write('<head><title>Connection</title></head><body>');
        res.write('<h2>Connection form:</h2>');
        res.write('<form method="POST" action="login"><div><label>Login</label><input type="text" name="login"/></form>');
        res.write('<div><label>Passord</label><input type="password" name="password"/></div><button type="submit">Send</button></form>');
        res.write('</body></html>');
        res.end();
    } else if(req.url === '/login' && req.method === 'POST'){
        
        const data = [];
        req.on('data', chunk => {
            data.push(chunk);
        });

        req.on('end', () => {
            const parsedData = Buffer.concat(data).toString();
            const {login, password} = parseConnectionForm(parsedData);

            if(login === 'alex' && password === '123'){
                res.setHeader('Location', '/');
            } else {
                res.setHeader('Location', '/connection');
            }
            res.statusCode = 302;
            
            res.end();
        });
    } else {
        res.write('<html>');
        res.write('<head><title>Not found</title></head><body>');
        res.write('<h2>Page not found!</h2>');
        res.write('</body></html>');
        res.statusCode = 404;
        res.end();
    }
    
};

const parseConnectionForm = (parsedData) => {
    const list = parsedData.split('&');
    const login = list[0].split('=')[1];
    const password = list[1].split('=')[1];
    return {login: login, password: password};
}

module.exports.requestListener = requestListener;