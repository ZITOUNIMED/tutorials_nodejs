
import User from '../../models/user';

import { Request, Response } from 'express';
import { sendMail } from '../../services/mail';
import { createCredentials } from '../../services/credentials';
import { hashPass } from '../../util/auth';

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
            if(user && user.role !== 'ADMIN'){
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
            if(user && user.role !== 'ADMIN'){
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

export function generateUserPass(req: Request, res: Response){
    const {firstName, lastName, email, login} = req.body;
    if(login && email){
        const randomPass = generateRandomPass(10);
        hashPass(randomPass)
        .then(hashedPass => {
            return createCredentials({login, password: hashedPass, isTemporary: true})
        })
        .then(() => {
            const template = `
            <p>
                Hi <b>${firstName} ${lastName}</b>, a temporary password was sent to you <b>${randomPass}</b>. your login is <b>${login}</b>.<br/>
                Now you can connect from <a href='http://localhost:4200/connection'>here</a>. 
                <bAttetion!</b> This is a temporary password and it is valid during just 1 hour.<br/> 
                Click <a href='http://localhost:3000/update-pass/${login}'>here</a> to update it.
            </p>
            `;
            return sendMail(email, 'Temporary Password', template);
        }).then(() => {
            res.json();
        })
        .catch(err => {
            console.log(err)
            res.status(500).json();
        })
    } else {
        res.status(500).json();
    }
}

function generateRandomPass(length: number) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$*';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}