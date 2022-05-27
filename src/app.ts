import express from 'express';

import bodyParser from 'body-parser';
import path from 'path';

import sequelize from '../db';

import welcomeRouter from './routes/welcome'; 
import connectionRouter from './routes/connection'; 
import loginRouter from './routes/login'; 
import productRouter from './routes/products'; 
import usersRouter from './routes/users'; 

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

sequelize.sync()
.then(() => {
    app.listen(3000, () => { console.log('Server is running on port 3000 ...')});
})
.catch((err: any) => {console.log(err)});