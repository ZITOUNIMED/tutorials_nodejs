import { isAuthenticated, getConnectedUserId, isAdmin } from '../../util/auth';

import User from '../../models/user';

import { Request, Response } from 'express';

export function getUsersPage(req: Request, res: Response): void {
    fetchUsers(req, res);
}

export function getUserProfilePage(req: Request, res: Response): void {
    User.findOne({where: {id: getConnectedUserId(req)}})
    .then((user: any) => {
        res.render('user-profile' , { 
            pageTitle: 'User Profile Page',
            page: '',
            user: user,
            isAuthenticated: isAuthenticated(req),
            isAdmin: user && user.role === 'ADMIN',
        });
    })
    .catch(err => {console.log(err)});
}

export function saveUser(req: Request, res: Response): void {
    const {firstName, lastName, login, role, postAction} = req.body;

    if(postAction === 'update'){
        res.statusCode = 200;
        User.findOne({where: {login: login}})
        .then((user: any) => {
            if(user){
                user.firstName = firstName;
                user.lastName = lastName;
                user.role = role;
                return user.save();
            }
            return new Promise((_, reject) => {reject('User does not exist!')});
        })
        .then(() => {
            fetchUsers(req, res);
        })
        .catch(err => {console.log(err)});
    } else {
        res.statusCode = 201;
        User.create({firstName, lastName, login, role}).then(() => {
            fetchUsers(req, res);
        })
        .catch(err => {console.log(err)});
   }
}

export function deleteUser(req: Request, res: Response): void {
    const login = req.params.login;

    res.setHeader('Content-Type', 'text/plain');

    User.findOne({where: {login: login}})
        .then((user: any) => {
            if(user){
                return user.destroy();
            }
            return new Promise((_, reject) => {reject('User does not exist!')});
        })
        .then(() => {
            res.statusCode = 200;
            res.end('User deleted with success!')
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 404;
            res.end(err.message);
        });
}

function fetchUsers(req: Request, res: Response): void {
    User.findAll().then(users => {
        isAdmin(req, isAnAdmin => {
            res.render('users', {
                users: users,
                pageTitle: 'Users Page',
                page: 'users',
                isAuthenticated: isAuthenticated(req),
                isAdmin: isAnAdmin,
            });
        });
    }).catch(err => {console.log(err)});
}