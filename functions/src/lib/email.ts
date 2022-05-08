import {createTransport, Transporter} from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendMail(to: string, subject: string, body: string) {
  console.log(`✉️ Sending email to ${to}...`);

  try {
    const data = {
      "from": "Ciernediery-bot <ciernediery.bot@gmail.com>",
      to,
      subject,
      "h:Reply-To": "ciernediery.bot@gmail.com",
      "html": body,
    };

    await getTransporter().sendMail(data);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}.`);
    console.error(JSON.stringify(err));
  }
}
