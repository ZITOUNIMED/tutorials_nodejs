import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { getUserByLogin, getUserById } from '../services/users';

dotenv.config({path: "./vars/.env"});

export function generateAccessToken(login: string){
    const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
    return jwt.sign({username: login}, TOKEN_SECRET, {expiresIn: '1d'});
}

export function authenticateToken(req: any, res: Response, next: NextFunction){
    const token = req.headers['authorization'];

    if(!token) res.status(401).end();

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err);
        if(err) res.status(403).end();

        getUserByLogin(user.username).then(user => {
            req.userId = user.id;
            next();
        });
    })
}

export function isAdmin(req: any, callback: (isOk: boolean) => void): void {
    const id = req.userId;

    if(id){
        getUserById(id).then(user => {
            if(user && user.role === 'ADMIN'){
                callback(true);
            } else {
                callback(false);
            }
        }).catch(err => {console.log(err)});
    } else {
        callback(false);
    }
}


export function isAdminConnected(req: any, res: Response, next: NextFunction): void {
    const login = req.userId;

    getUserById(login).then(data => {
        if(data && data.role === 'ADMIN'){
            next();
        } else {
            res.status(401).json({message: 'User is not Admin!'})
        }
    }).catch(err => {console.log(err)});
}