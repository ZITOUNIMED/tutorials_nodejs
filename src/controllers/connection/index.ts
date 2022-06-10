import { Response } from 'express';
import bcrypt from 'bcrypt';

import { createCredentials, getCredentialsByLogin } from '../../services/credentials';
import { createUser, getUserByLogin } from '../../services/users';
import { isAdmin, generateAccessToken, hashPass } from '../../util/auth';

export function signIn(req: any, res: Response): void {
    const {login, password} = req.body;

    getCredentialsByLogin(login)
    .then((credentials: any) => {
        if(!createCredentials){
            res.status(401).json({isAuthenticated: false, isAdmin: false, token: ''}); // Unauthorized
        }
        return bcrypt.compare(password, credentials.password)
    })
    .then(isValid => {
        if(!isValid){
            res.status(401).json({isAuthenticated: false, isAdmin: false, token: ''}); // Unauthorized
        }
        return getUserByLogin(login);
    })
    .then(user => {
        const token = generateAccessToken(login);
        req.userId = user.id;
        isAdmin(req,  isAnAdmin => {
                res.json({isAuthenticated: true, 'isAdmin': isAnAdmin, token: token});
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({isAuthenticated: false, 'isAdmin': false, token: ''}); // Server error
    });
}

export function signUp(req: any, res: Response): void {
    const {firstName, lastName, email, login, password} = req.body;

    getUserByLogin(login)
    .then(user => {
        if(user){
            res.status(401).json({message: 'Login is unavailable. please use an other one!'})
        }

        return createUser({firstName, lastName, email, login, role: 'USER'})
    })
    .then(user => {
        req.userId = user.id;
        return hashPass(password);
    })
    .then(hashedPassword => {
        return createCredentials({login, password: hashedPassword});
    })
    .then(() => {
        const token = generateAccessToken(login);
        res.json({isAuthenticated: true, isAdmin: false, token: token});
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({isAuthenticated: false, 'isAdmin': false, token: ''}); // Server error
    })
}