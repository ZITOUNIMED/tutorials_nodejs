import { NextFunction, Request, Response } from 'express';
import { getUserByLogin, getUserById } from '../services/users';

export function isAuthenticated(req: Request): boolean {
    return extractCookies(req).isAuthenticated;
}

export function getConnectedUserId(req: Request): number {
    return extractCookies(req).userId;
}

export function isUserExisting(login: string, callback: (isOk: boolean, userId?: number) => void): void {
    getUserByLogin(login).then(user => {
        if(user){
            callback(true, user.id);
        } else {
            callback(false);
        }
    });
}

export function isAdmin(req: Request, callback: (isOk: boolean) => void, userId?: number): void {
    const id = userId || extractCookies(req).userId;

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


export function isAdminConnected(req: Request, res: Response, next: NextFunction): void {
    const login = extractCookies(req).userId;

    getUserById(login).then(data => {
        if(data && data.role === 'ADMIN'){
            next();
        } else {
            res.render('error' , { 
                pageTitle: 'Error Page',
                page: '',
                user: data,
                isAuthenticated: extractCookies(req).isAuthenticated,
                isAdmin: false,
            });
        }
    }).catch(err => {console.log(err)});
}

function extractCookies(req: Request):  {isAuthenticated: boolean, userId: number} {
    const cookiesObj = {isAuthenticated: false, userId: 0};
    try {
        let cookiesStr = req.get('Cookie') as string;
        if(!cookiesStr){
            const cookiesList = req.get('Set-Cookie');
            cookiesStr = cookiesList && cookiesList.length>0 ? (cookiesList[0] as string) : '';
        }

        cookiesStr.split(';').map(c => c.trim()).forEach(c => {
            const key: string = c.split('=')[0];
            const value: string = c.split('=')[1];
            if(key === 'isAuthenticated') {
                cookiesObj.isAuthenticated = (value === 'true')
            } else if(key === 'userId'){
                cookiesObj.userId = Number(value);
            }
        });
    } catch(err) {
        console.log('Cookies not found!')
    }
    
    return cookiesObj;
}
