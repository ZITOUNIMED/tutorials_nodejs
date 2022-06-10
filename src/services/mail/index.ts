import mailTransporter from '../../util/mail-transporter'
import dotenv from 'dotenv';

dotenv.config();

export function sendMail(to: string, subject: string, template: string): Promise<any>{
    const mailOptions = {
        from: process.env.APP_MAIL_ADDRESS,
        to,
        subject,
        html: template
    };

    return mailTransporter.sendMail(mailOptions);
}