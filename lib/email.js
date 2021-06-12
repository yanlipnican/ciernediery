import mailgun from "mailgun-js";

const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

export async function sendMail(to, subject, body) {
    console.log(`✉️ Sending email to ${to}...`);

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
