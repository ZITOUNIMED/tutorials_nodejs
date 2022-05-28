import { Request, Response } from 'express';
import { isAuthenticated, isAdmin } from '../../util/auth';

export function getWelcome(req: Request, res: Response): void {
    res.json({
        'message': 'hello from server'
    });
}

export function getWelcomeData(req: Request, res: Response): void {
    isAdmin(req, isAnAdmin => {
        res.json({
            'isAdmin': isAnAdmin
        });
    })
}


/*res.render('welcome' , { 
    pageTitle: 'Welcome Page',
    page: 'welcome',
    isAuthenticated: isAuthenticated(req),
    isAdmin: isAnAdmin,
});*/