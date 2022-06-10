import { Request, Response } from "express";
import { hashPass } from "../../util/auth";
import dotenv from 'dotenv';

import { getCredentialsByLogin, isTemporaryExpiredPass, updateCredentials } from "../../services/credentials";

dotenv.config();

export function getUpdatePassPage(req: Request, res: Response): void {
    const login = req.params.login;
    res.render('update-pass', {
        login: login,
        updated: false,
        success: false,
        frontendPath: ''
    });
}

export function updatePass(req: Request, res: Response): void {
    const { login, newPassword, confirmPassword } = req.body;
    if(!login || newPassword !== confirmPassword){
        res.render('update-pass', {
            login: '',
            updated: true,
            success: false,
            frontendPath: process.env.FRONTEND_PATH
        });
    }
    // get previous credentials
    getCredentialsByLogin(login)
    .then((credentials: any) => {
        // verify pass expired
        if(!credentials || isTemporaryExpiredPass(credentials)){
            res.render('update-pass', {
                login: '',
                updated: true,
                success: false,
                frontendPath: process.env.FRONTEND_PATH
            });
        }
        // hash pass
       return hashPass(newPassword)
    })
    .then(hashedPass => {
        // save database isTomporary false
        return updateCredentials(login, hashedPass, false)
    })
    .then(() => {
        res.render('update-pass', {
            login: '',
            updated: true,
            success: true,
            frontendPath: process.env.FRONTEND_PATH
        });
    })
    .catch(err => {
        console.log(err);
        res.render('update-pass', {
            login: '',
            updated: true,
            success: false,
            frontendPath: process.env.FRONTEND_PATH
        });
    })
}