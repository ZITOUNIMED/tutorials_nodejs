import User from '../../models/user';

export function getUserById(userId: number): Promise<any> {
    return User.findOne({where: {id : userId}});
}

export function getUserByLogin(login: string): Promise<any> {
    return User.findOne({where: {login : login}});
}

export function createUser(user: {firstName: string, lastName: string, email: string, login: string, role: string}): Promise<any> {
    return User.create(user);
}