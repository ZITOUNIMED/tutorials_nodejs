import { isAuthenticated, getConnectedUserLogin, isAdmin } from '../../util/auth';
import User from '../../models/user';
import { Request, Response } from 'express';

export function getUsersPage(req: Request, res: Response): void {
    fetchUsers(req, res);
}

export function getUserProfilePage(req: Request, res: Response): void {
    User.findAll({where: {login: getConnectedUserLogin(req)}})
    .then((users: any[]) => {
        res.render('user-profile' , { 
            pageTitle: 'User Profile Page',
            page: '',
            user: users && users[0],
            isAuthenticated: isAuthenticated(req),
            isAdmin: users && users[0] && users[0].role === 'ADMIN',
        });
    })
    .catch(err => {console.log(err)});
}

export function saveUser(req: Request, res: Response): void {
    const {firstname, lastname, login, role, postAction} = req.body;

    if(postAction === 'update'){
        res.statusCode = 200;
        User.findAll({where: {login: login}})
        .then((users: any[]) => {
            if(users && users.length>0){
                users[0].firstname = firstname;
                users[0].lastname = lastname;
                users[0].role = role;
                return users[0].save();
            }
            return new Promise((_, reject) => {reject('User does not exist!')});
        })
        .then(() => {
            fetchUsers(req, res);
        })
        .catch(err => {console.log(err)});
    } else {
        res.statusCode = 201;
        User.create({firstname, lastname, login, role}).then(() => {
            fetchUsers(req, res);
        })
        .catch(err => {console.log(err)});
   }
}

export function deleteUser(req: Request, res: Response): void {
    const login = req.params.login;

    res.setHeader('Content-Type', 'text/plain');

    User.findAll({where: {login: login}})
        .then(users => {
            if(users && users.length>0){
                return users[0].destroy();
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