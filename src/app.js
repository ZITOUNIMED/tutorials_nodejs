const express = require('express');
const bodyParser = require('body-parser');

const { welcomeRoutes } = require('./welcome.routes'); 
const { connectionRoutes } = require('./connection.routes'); 
const { loginRoutes } = require('./login.routes'); 
const { productRoutes } = require('./product.routes'); 

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/connection', connectionRoutes);
app.use('/login', loginRoutes);
app.use('/product*', productRoutes);
app.use(welcomeRoutes);


app.listen(3000, () => { console.log('Server is running on port 3000 ...')});