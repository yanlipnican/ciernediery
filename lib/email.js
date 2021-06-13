import mailgun from "mailgun-js";

let _mg = null;

function getMailgun() {
    if (!_mg) {
        _mg = mailgun({
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN,
        });
    }
    return _mg;
}

export async function sendMail(to, subject, body) {
    console.log(`✉️ Sending email to ${to}...`);
    const mg = getMailgun();

    try {
        const data = {
            from: "Ciernediery-bot <ciernediery-bot@lipnican.dev>",
            to, // An array if you have multiple recipients.
            subject,
            'h:Reply-To': 'ciernediery-bot@lipnican.dev',
            html: body,
        };

        await mg.messages().send(data);
    } catch(err) {
        console.error(`❌ Failed to send email to ${to}.`);
        console.error(err);
    }
}
