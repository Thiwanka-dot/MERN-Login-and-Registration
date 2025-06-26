const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (to, subject, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
              rejectUnauthorized: false // <-- IMPORTANT LINE
            }
        });
    
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent
        });

        console.log('✅ Email sent successfully!');
    } catch (error) {
    console.error('❌ Email failed to send:', error.message)
    }
};

module.exports = sendEmail;