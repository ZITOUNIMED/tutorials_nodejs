import mailTransporter from '../../util/mail-transporter';

export function sendMail(to: string, subject: string, template: string): Promise<any> {
    const mailOptions = {
        from: 'med.products.managment@gmail.com',
        to,
        subject,
        html: template
    }

    return mailTransporter.sendMail(mailOptions);
}