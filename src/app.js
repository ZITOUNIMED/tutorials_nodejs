const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { welcomeRoutes } = require('./routes/welcome'); 
const { connectionRoutes } = require('./routes/connection'); 
const { loginRoutes } = require('./routes/login'); 
const { productRoutes } = require('./routes/product'); 
const { usersRoutes } = require('./routes/users'); 

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/connection', connectionRoutes);
app.use('/login', loginRoutes);
app.use('/product*', productRoutes);
app.use('/users', usersRoutes);
app.use(welcomeRoutes);


app.listen(3000, () => { console.log('Server is running on port 3000 ...')});