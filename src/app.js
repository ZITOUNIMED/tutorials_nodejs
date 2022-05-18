const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database');

const { welcomeRoutes } = require('./routes/welcome'); 
const { connectionRoutes } = require('./routes/connection'); 
const { loginRoutes } = require('./routes/login'); 
const { productRoutes } = require('./routes/product'); 
const { usersRoutes } = require('./routes/users'); 
const User = require('./models/user');
const Product = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/connection', connectionRoutes);
app.use('/login', loginRoutes);
app.use('/product', productRoutes);
app.use('/users', usersRoutes);
app.use(welcomeRoutes);

Product.belongsTo(User);

sequelize.sync()
.then(() => User.findAll({where: {login: 'med'}}))
.then(users => {
    if(!users | users.length<=0){
        return User.create({login: 'med', firstname: 'Mohamed', lastname: 'Zitouni', role: 'ADMIN'})
    }
    return new Promise((resolve, _) => {resolve('User found.')});
})
.then(() => {
    app.listen(3000, () => { console.log('Server is running on port 3000 ...')});
})
.catch(err => {console.log(err)});