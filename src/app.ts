import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import sequelize from '../db';

dotenv.config({path: "./vars/.env"});

import connectionRouter from './routes/connection'; 
import productRouter from './routes/products'; 
import usersRouter from './routes/users'; 
import { authenticateToken } from './util/auth';

const app = express();

app.use(express.static(path.join(__dirname, 'frontend', 'dist', 'frontend')));
app.use(cors());
app.use(express.json());

app.use('/connection', connectionRouter);
app.use('/product', authenticateToken, productRouter);
app.use('/users', authenticateToken, usersRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'frontend', 'index.html'))
});

const PORT = process.env.PORT;

sequelize.sync()
.then(() => {
    app.listen(PORT, () => { console.log(`Server is running on port ${PORT} ...`)});
})
.catch((err: any) => {console.log(err)});