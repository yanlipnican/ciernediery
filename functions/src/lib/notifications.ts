import * as Ciernediery from "./ciernediery";
import * as Twitter from "./twitter";

// import * as Email from "./email";
// import * as db from "./db";
// import * as ejs from "ejs";

// async function sendEmails(newProducts: Array<Ciernediery.Product>) {
//   console.log("✉️ Sending emails");

//   const subscribers = await db.getSubscribers();

//   if (subscribers.length === 0) {
//     console.log("🤷 No subscribers.");
//     return;
//   }

//   await Promise.all(subscribers.map(async ({email, name}) => {
//     const body = await ejs.renderFile("./templates/email.template.ejs", {email, name, newProducts});
//     await Email.sendMail(email, "New products at ciernediery.sk", body);
//   }));

//   console.log(`✅ ${subscribers.length} emails sent.`);
// }

async function sendTweets(newProducts: Array<Ciernediery.Product>) {
  console.log("🐥 Sending tweets.");

  const messages = newProducts.map((product) =>
    `🏙 New product in store\n${product.link}`,
  );

  await Promise.all(
      messages.map((text) => Twitter.getTwitterClient().tweetsV2.createTweet({text}))
  );

  console.log(`✅ ${messages.length} tweets sent.`);
}

export async function sendNotifications(newProducts: Array<Ciernediery.Product>) {
  console.log("🛩️ Sending notifications...");

  // await sendEmails(newProducts);

  await sendTweets(newProducts);

  console.log("✅ Notifications were sent.");
}
