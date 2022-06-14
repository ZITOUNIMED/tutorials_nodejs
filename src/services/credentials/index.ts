import Credentials from "../../models/credentials";
import moment from 'moment';

export function createCredentials(credentials: {login: string, password: string, isTemporary?: boolean}): Promise<any> {
    return Credentials.create(credentials);
}

export function getCredentialsByLogin(login: string): Promise<any> {
    return Credentials.findOne({where: {login: login}});
}

export function updateCredentials(login: string, password: string, isTemporary?: boolean): Promise<any> {
    return Credentials.findOne({where: {login: login}})
    .then((credentials: any)=> {
        credentials.isTemporary = isTemporary;
        credentials.password = password;
        return credentials.save();
    })
}

export function isTemporaryExpiredPass(credentials: any): boolean{
    if(credentials.isTemporary){
        const createdTime = Date.parse(credentials.createdAt);
        const validTime = moment().subtract(1, 'hour').valueOf();
        return validTime > createdTime;
    }
    return false;
}

export function deleteCredentialsByLogin(login: string): Promise<any> {
    return Credentials.findOne({where: {login: login}})
    .then(credentials => credentials?.destroy());
}