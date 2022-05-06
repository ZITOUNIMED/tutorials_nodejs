const http = require('http');
const { requestListener } = require('./routes'); 

http.createServer(requestListener).listen(3000, () => { console.log('Server is running on port 3000 ...')});