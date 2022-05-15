const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', '..', 'data', 'users.json');
const db = require('../util/database');

module.exports = class User {
    constructor(firstname, lastname, login, role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.login = login;
        this.role = role;
    }

    add(){
        const {firstname, lastname, login, role} = this;
        return db.execute('INSERT INTO users (firstname, lastname, login, role) values (?, ?, ?, ?)', [firstname, lastname, login, role]);
    }

    update() {
        const {firstname, lastname, login, role} = this;
        return db.execute('UPDATE users SET firstname=?, lastname=?, role=? WHERE login=?', [firstname, lastname, role, login]);
    }

    static getUserByLogin(login) {
        return db.execute('SELECT * FROM users WHERE login = ?', [login]);
    }

    static delete(login) {
        return db.execute('DELETE FROM users WHERE login=?', [login])
    }

    static getUsers(){
        return db.execute('SELECT * FROM users');
    }
}
