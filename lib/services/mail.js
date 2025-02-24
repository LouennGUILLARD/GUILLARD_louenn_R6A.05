const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const sendWelcomeEmail = async (user) => {
    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: 'Bienvenue sur notre plateforme',
        text: `Bonjour ${user.firstName},\n\nMerci de vous être inscrit sur notre plateforme !`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendWelcomeEmail
};