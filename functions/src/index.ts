import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import * as Ciernediery from "./lib/ciernediery";
import * as Notifications from "./lib/notifications";

initializeApp();

const secrets = [
  "TWITTER_API_KEY",
  "TWITTER_API_SECRET",
  "TWITTER_ACCESS_TOKEN",
  "TWITTER_ACCESS_TOKEN_SECRET",
  "GMAIL_USER",
  "GMAIL_PASSWORD",
];

function handleError(error: any) {
  console.error(`❌ Check failed. Cause: ${JSON.stringify(error)}.`);
  process.exit(1);
}

export const scheduledFunction = functions
    .region("europe-west2")
    .runWith({secrets})
    .pubsub
    .schedule("every 10 minutes")
    .onRun(async (_context) => {
      console.log("🌟 Running check.");

      try {
        const newProducts = await Ciernediery.getNewProducts();

        if (newProducts.length > 0) {
          console.log(`😃 Found ${newProducts.length} new ${newProducts.length > 1 ? "products" : "product"}.`);
          newProducts.forEach((product) => `🎑 ${product.name} - ${product.price}`);

          await Notifications.sendNotifications(newProducts);
        } else {
          console.log("😥 No new products detected.");
        }

        console.log("✅ Check successful.");
      } catch (err) {
        handleError(err);
        process.exit(1);
      }

      process.exit(0);
    });
