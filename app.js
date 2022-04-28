const http = require('http');

// Core Modules: http, https, os, path, fs
// Local Modules: 
// Third Pard Modules: rxjs

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Welcome Page</title></head><body>');
    res.write('<h2>Hello from the server!');
    res.write('</body></html>');
    res.end();

}).listen(3000);