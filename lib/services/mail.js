const Schmervice = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Schmervice.Service {

    static get name() {
        return 'mailService';
    }

    constructor(server, options) {
        super(server, options);

        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
    }

    async sendWelcomeEmail(user) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: user.email,
            subject: 'Bienvenue sur notre plateforme',
            text: `Bonjour ${user.firstName},\n\nMerci de vous être inscrit sur notre plateforme !`
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${user.email}`);
        } catch (error) {
            console.error(`Failed to send email to ${user.email}:`, error);
            throw error;
        }
    }
};