import { Request, Response } from 'express';
import { isAdmin } from '../../util/auth';

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
