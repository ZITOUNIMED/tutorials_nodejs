import User from '../../models/user';

export function getUserByLogin(login: string): Promise<any> {
    return User.findAll({where: {login : login}});
}