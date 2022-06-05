
import User from '../../models/user';

import { Request, Response } from 'express';

export function getUsersPage(req: Request, res: Response): void {
    fetchUsers(req, res);
}

export function getUserProfile(req: any, res: Response): void {
    User.findOne({where: {id: req.userId}})
    .then((user: any) => {
        res.json(user);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
}

export function createUser(req: Request, res: Response): void {
    const {firstName, lastName, email, login, role} = req.body;

    User.create({firstName, lastName, email, login, role}).then(() => {
        fetchUsers(req, res);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err.errors)
    });
}

export function updateUser(req: Request, res: Response): void {
    const {firstName, lastName, email, login, role} = req.body;
    User.findOne({where: {login: login}})
        .then((user: any) => {
            if(user){
                user.firstName = firstName;
                user.lastName = lastName;
                user.email = email;
                user.role = role;
                return user.save();
            }
            return new Promise((_, reject) => {reject({message: 'User does not exist!'})});
        })
        .then(() => {
            fetchUsers(req, res);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err.errors)
        });
}

export function deleteUser(req: Request, res: Response): void {
    const login = req.params.login;

    User.findOne({where: {login: login}})
        .then((user: any) => {
            if(user){
                return user.destroy();
            }
            return new Promise((_, reject) => {reject({message: 'User does not exist!'})});
        })
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
}

function fetchUsers(req: Request, res: Response): void {
    User.findAll().then(users => {
        res.json(users);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
}