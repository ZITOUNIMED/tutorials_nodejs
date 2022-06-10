import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    requireTLS: true,
    auth: {
        user: 'med.products.managment@gmail.com',
        pass: process.env.MAIL_APP_PASS
    },
    secure: true,
    logger: true
});


export default transporter;