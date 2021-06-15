import nodemailer from "nodemailer";

let _mail_transporter = null;

function getTransporter() {
    if (!_mail_transporter) {
        _mail_transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
    }
    return _mail_transporter;
}

export async function sendMail(to, subject, body) {    
    console.log(`✉️ Sending email to ${to}...`);

    const transporter = getTransporter();

    try {
        const data = {
            from: "Ciernediery-bot <ciernediery.bot@gmail.com>",
            to,
            subject,
            'h:Reply-To': 'ciernediery.bot@gmail.com',
            html: body,
        };

        await transporter.sendMail(data);
    } catch(err) {
        console.error(`❌ Failed to send email to ${to}. Cause: ${err}`);
    }
}
