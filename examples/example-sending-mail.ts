import { sendMail } from '../src/services/mail';

const to = 'zitouni.mohamed.email@gmail.com';
const subject = 'Test Mail 3';
const template = `
        <b>Hello Med</b>
        <p>How are you?</p>
    `;

sendMail(to, subject, template)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})