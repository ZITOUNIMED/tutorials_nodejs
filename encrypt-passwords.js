const bcrypt = require('bcrypt')

const encryptPasswords = async () => {
    const salt1 = await bcrypt.genSalt(10);
    const hashedPass1 = await bcrypt.hash('123', salt1);

    console.log(hashedPass1);

    const salt2 = await bcrypt.genSalt(10);
    const hashedPass2 = await bcrypt.hash('321', salt2);

    console.log(hashedPass2);
}

encryptPasswords();

