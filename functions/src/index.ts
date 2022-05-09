import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import * as Ciernediery from "./lib/ciernediery";
import * as Notifications from "./lib/notifications";
import {getSecretsList} from "./lib/secrets";

initializeApp();

export const scheduledFunction = functions
    .region("europe-west2")
    .runWith({secrets: getSecretsList()})
    .pubsub
    .schedule("every 2 minutes")
    .onRun(async (_context) => {
      console.log("🌟 Running check.");

      try {
        const newProducts = await Ciernediery.getNewProducts();

        if (newProducts.length > 0) {
          console.log(`😃 Found new products.`);
          newProducts.forEach(product => console.log(`🎑 ${product.name} - ${product.price}`));

          await Notifications.sendNotifications(newProducts);
        } else {
          console.log("😥 No new products detected.");
        }

        console.log("✅ Check successful.");
      } catch (err) {
        console.error(`❌ Check failed. Cause: ${JSON.stringify(err)}.`);
      }
    });
