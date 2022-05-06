const http = require('http');
const { welcomeRoutes } = require('./welcome.routes'); 
const { connectionRoutes } = require('./connection.routes'); 
const { loginRoutes } = require('./login.routes'); 
const { productRoutes } = require('./product.routes'); 

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    if(req.url === '/'){
        welcomeRoutes(req, res);
    } else if(req.url === '/connection'){
        connectionRoutes(req, res);
    } else if(req.url === '/login'){
        loginRoutes(req, res);
    } else if(req.url.startsWith('/product')){
        productRoutes(req, res);
    } else {
        res.write('<html>');
        res.write('<head><title>Not found</title></head><body>');
        res.write('<h2>Page not found!</h2>');
        res.write('</body></html>');
        res.statusCode = 404;
        res.end();
    }
})

server.listen(3000, () => { console.log('Server is running on port 3000 ...')});