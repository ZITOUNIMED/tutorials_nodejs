import { sendMail } from "../src/services/mail";


const to = 'zitouni.mohamed.email@gmail.com';
const subject = 'Test Nodemaile 2';
const template = `<h3>Hello 2 Med</h3>`;

sendMail(to, subject, template)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})