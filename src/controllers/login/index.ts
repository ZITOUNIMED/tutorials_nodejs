import { Request, Response } from 'express';
import { isUserExisting, isAdmin, generateAccessToken } from '../../util/auth';

export function signIn(req: any, res: Response): void {
    const {login, password} = req.body;

    isUserExisting(login, (isExisting: boolean, userId?: number) => {
        const token = generateAccessToken(login);
        req.userId = userId;
        isAdmin(req, 
                isAnAdmin => {
                    if(isExisting){
                        res.json({isAuthenticated: true, 'isAdmin': isAnAdmin, token: token});
                    } else {
                        res.status(302).json({isAuthenticated: false, 'isAdmin': false, token: ''});
                    }
                })
    })
}