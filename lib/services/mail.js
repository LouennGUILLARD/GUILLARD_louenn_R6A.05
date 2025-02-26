'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {

    constructor(...args) {
        super(...args);

        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendWelcomeEmail(user) {
        try {
            const info = await this.transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: "Bienvenue !",
                text: `Bonjour et bienvenue dans le Filmathon ! Nous sommes ravis de vous avoir parmi nous.\n`,
                html: `<p>Bonjour <strong>${user.firstName}</strong>,</p><p>Bienvenue dans le Filmathon! Nous sommes ravis de vous avoir parmi nous.</p><p>En vous souhaitant un bon visionnage</p>`
            });

            console.log(`E-mail envoyé : ${info.messageId}`);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
        }
    }

    async sendNewMovie(user) {
        try {
            const info = await this.transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: "NEWS : NOUVEAU FILM !!!",
                text: `Bonjour ${user.firstName},\n\nUn nouveau film est dans la place\n`,
                html: `<p>Bonjour <strong>${user.firstName}</strong>,</p><p>Nous heureux de vous dire qu'un nouveau film est sorti !</p><p>En vous souhaitant un bon visionnage</p>`
            });

            console.log(`E-mail envoyé : ${info.messageId}`);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
        }
    }
};
