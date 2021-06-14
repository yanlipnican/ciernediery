import axios from "axios";

export async function sendMail(to, subject, body) {
    console.log(`✉️ Sending email to ${to}...`);

    try {
        const data = {
            from: "Ciernediery-bot <ciernediery-bot@lipnican.dev>",
            to,
            subject,
            'h:Reply-To': 'ciernediery-bot@lipnican.dev',
            html: body,
        };

        await axios({
            method: "POST",
            url: `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
            data: new URLSearchParams(data),
            auth: { password: process.env.MAILGUN_API_KEY, username: "api" },
        })
    } catch(err) {
        console.error(`❌ Failed to send email to ${to}. Cause: ${err.response?.data?.message}`);
    }
}
