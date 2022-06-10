import bcrypt from 'bcrypt';
import moment from 'moment';

import Credentials from "../../models/credentials";

export function createCredentials(credentials: {login: string, password: string, isTemporary?: boolean}): Promise<any> {
    return Credentials.create(credentials);
}

export function updateCredentials(login: string, password: string, isTemporary?: boolean): Promise<any> {
    return Credentials.findOne({where: {login: login}})
    .then((credentials: any)=> {
        credentials.password = password;
        credentials.isTemporary = isTemporary;
        return credentials.save();
    })
}

export function getCredentialsByLogin(login: string): Promise<any> {
    return Credentials.findOne({where: {login: login}});
}

export function isExpiredTemporaryPassword(credentials: any) {
    if(credentials.isTemporary){
        const createdAtTime = Date.parse(credentials.createdAt);
        const validTime = moment().subtract(1, 'hour').valueOf();
        return createdAtTime<validTime;
    }
    return false;
}