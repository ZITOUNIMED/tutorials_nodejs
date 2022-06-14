import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    requireTLS: true,
    auth: {
        user: process.env.APP_MAIL_ADDRESS,
        pass: process.env.APP_MAIL_PASS,
    },
    secure: true,
    logger: true
});

export default transporter;