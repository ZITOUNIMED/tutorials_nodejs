import express from 'express';

import bodyParser from 'body-parser';
import path from 'path';
import sequelize from './util/database';

import welcomeRouter from './routes/welcome'; 
import connectionRouter from './routes/connection'; 
import loginRouter from './routes/login'; 
import productRouter from './routes/products'; 
import usersRouter from './routes/users'; 

import User from './models/user';
import Product from './models/product';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/connection', connectionRouter);
app.use('/login', loginRouter);
app.use('/product', productRouter);
app.use('/users', usersRouter);
app.use(welcomeRouter);

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
.catch((err: any) => {console.log(err)});