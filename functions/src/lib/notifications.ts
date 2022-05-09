import {Product} from "./ciernediery";
import {getTwitterClient} from "./twitter";

async function sendTweets(newProducts: Array<Product>) {
  console.log("🐥 Sending tweets.");

  const messages = newProducts.map((product) =>
    `🏙 New product in store\n${product.link}`,
  );

  await Promise.all(
      messages.map((text) => getTwitterClient().tweetsV2.createTweet({text}))
  );

  console.log(`✅ ${messages.length} tweets sent.`);
}

export async function sendNotifications(newProducts: Array<Product>) {
  console.log("🛩️ Sending notifications...");

  await sendTweets(newProducts);

  console.log("✅ Notifications were sent.");
}
