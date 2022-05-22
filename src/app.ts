import express from 'express';

import bodyParser from 'body-parser';
import path from 'path';
/*import sequelize from './util/database';

import { welcomeRoutes } from './routes/welcome'; 
import { connectionRoutes } from './routes/connection'; 
import { loginRoutes } from './routes/login'; 
import { productRoutes } from './routes/product'; 
import { usersRoutes } from './routes/users'; 
import User from './models/user';
import Product from './models/product';*/

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

/*
app.use('/connection', connectionRoutes);
app.use('/login', loginRoutes);
app.use('/product', productRoutes);
app.use('/users', usersRoutes);
app.use(welcomeRoutes);

Product.belongsTo(User);

sequelize.sync()
.then(() => User.findAll({where: {login: 'med'}}))
.then((users: any) => {
    if(!users || users.length<=0){
        return User.create({login: 'med', firstname: 'Mohamed', lastname: 'Zitouni', role: 'ADMIN'})
    }
    return new Promise((resolve, _) => {resolve('User found.')});
})
.then(() => {
    app.listen(3000, () => { console.log('Server is running on port 3000 ...')});
})
.catch((err: any) => {console.log(err)});*/

app.listen(3000, () => { console.log('Server is running on port 3000 ...')});