const bcrypt = require('bcrypt');

const encrypt =  () => {

    const credentials = [{login: 'med', password: '123'}, {login: 'khaledBen', password: '321'}];
    credentials.forEach(async item => {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(item.password, salt)
        console.log(`login: ${item.login}, hashedPass: ${hashedPass}`);
    })
}

encrypt();