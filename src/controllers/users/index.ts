
import User from '../../models/user';
import dotenv from 'dotenv';

import { Request, Response } from 'express';
import { sendMail } from '../../services/mail';
import { createCredentials, deleteCredentialsByLogin } from '../../services/credentials';
import { hashPass } from '../../util/auth';
import { deleteUserProducts } from '../../services/products';

dotenv.config();

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
                user.role = role;
                user.email = email;
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
    
    deleteCredentialsByLogin(login)
    .then(() => {
        return User.findOne({where: {login: login}})
    })
    .then((user: any) => {
        if(user){
            const userPromise = new Promise((resolve, _) => {resolve(user)});
            return Promise.all([userPromise, deleteUserProducts(user.id)])
        }
    })
    .then(list => {
        if(list){
            (list[0] as User).destroy()
        }
    })
    .then(() => {
        res.status(204).end();
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
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

export function generatePass(req: Request, res: Response): void {
    const { firstName, lastName, login, email } = req.body;
    const password = generateRandomPass(10);
    const template = `<p> 
        Hi <b>${firstName} ${lastName}</b>, a temporary password was sent to you <b>${password}</b>. Your login is <b>${login}</b>. <br/>
        Now you can connect from <a href="${process.env.FRONTEND_PATH}/#/connection">here</a>.<br/>
        <b>Attention!</b> This is a temporary password and it is valid just 1 hour.</b>
        Click <a href="${process.env.BACKEND_PATH}/update-pass/${login}">here</a> to update it.
    </p>`;

    hashPass(password)
    .then(hashedPassword => {
        return createCredentials({login, password: hashedPassword, isTemporary: true});
    })
    .then(() => {
        return sendMail(email, 'Temporary Password', template)
    }).then(() => {
        res.json()
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
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