import { Request, Response } from 'express';
import { isAuthenticated, isAdmin } from '../../util/auth';

export function getWelcomePage(req: Request, res: Response): void {
    isAdmin(req, isAnAdmin => {
        res.render('welcome' , { 
            pageTitle: 'Welcome Page',
            page: 'welcome',
            isAuthenticated: isAuthenticated(req),
            isAdmin: isAnAdmin,
        });
    })
}