import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {getNewProducts} from "./lib/ciernediery";
import {sendNotifications} from "./lib/notifications";
import {getSecretKeysList} from "./lib/secrets";

initializeApp();

export const scheduledFunction = functions
    .region("europe-west2")
    .runWith({secrets: getSecretKeysList()})
    .pubsub
    .schedule("every minute")
    .onRun(async (_context) => {
      console.log("🌟 Running check.");

      try {
        const newProducts = await getNewProducts();

        if (newProducts.length > 0) {
          console.log("😃 Found new products.");
          newProducts.forEach((product) => console.log(`🎑 ${product.name} - ${product.price}`));

          await sendNotifications(newProducts);
        } else {
          console.log("😥 No new products detected.");
        }

        console.log("✅ Check successful.");
      } catch (err) {
        console.error(`❌ Check failed. Cause: ${JSON.stringify(err)}.`);
      }
    });
