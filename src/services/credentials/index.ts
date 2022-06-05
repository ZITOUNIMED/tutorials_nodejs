import Credentials from "../../models/credentials";

export function createCredentials(credentials: {login: string, password: string}): Promise<any> {
    return Credentials.create(credentials);
}

export function getCredentialsByLogin(login: string): Promise<any> {
    return Credentials.findOne({where: {login: login}});
}