import { NextFunction, Request, Response } from 'express';
import { getUserByLogin } from '../services/users';

export function isAuthenticated(req: Request): boolean {
    return extractCookies(req.get('Cookie') as string).isAuthenticated;
}

export function getConnectedUserLogin(req: Request): string {
    return extractCookies(req.get('Cookie') as string).login;
}

export function isUserExisting(login: string, callback: (isOk: boolean) => void): void {
    getUserByLogin(login).then(users => {
        if(users && users.length>0){
            callback(true);
        } else {
            callback(false);
        }
    });
}

export function isAdmin(req: Request, callback: (isOk: boolean) => void): void {
    const login: string = extractCookies(req.get('Cookie') as string).login;

    if(login){
        getUserByLogin(login).then(data => {
            if(data && data[0] && data[0].role === 'ADMIN'){
                callback(true);
            } else {
                callback(false);
            }
        }).catch(err => {console.log(err)});
    } else {
        callback(false);
    }
}


export function isAdminConnected(req: Request, res: Response, next: NextFunction): void {
    const login = extractCookies(req.get('Cookie') as string).login;

    getUserByLogin(login).then(data => {
        if(data && data[0] && data[0].role === 'ADMIN'){
            next();
        } else {
            res.render('error' , { 
                pageTitle: 'Error Page',
                page: '',
                user: data && data[0],
                isAuthenticated: extractCookies(req.get('Cookie') as string).isAuthenticated,
                isAdmin: false,
            });
        }
    }).catch(err => {console.log(err)});
}

function extractCookies(cookiesStr: string):  {isAuthenticated: boolean, login: string} {
    const cookiesObj = {isAuthenticated: false, login: ''};
    try {
        cookiesStr.split(';').map(c => c.trim()).forEach(c => {
            const key: string = c.split('=')[0];
            const value: string = c.split('=')[1];
            if(key === 'isAuthenticated') {
                cookiesObj.isAuthenticated = (value === 'true')
            } else if(key === 'login'){
                cookiesObj.login = value;
            }
        });
    } catch(err) {
        console.log('Cookies not found!')
    }
    
    return cookiesObj;
}
