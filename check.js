import dotenv from "dotenv";
dotenv.config();

import * as Ciernediery from "./lib/ciernediery.js";
import * as Email from "./lib/email.js";
import * as db from "./lib/db.js";
import ejs from "ejs";

function handleError(error) {
    console.error(`❌ Check failed. Cause: ${error}.`);
    process.exit(1);
}

async function sendNotifications(newProducts) {
    console.log("🛩️ Sending notifications...");

    const subscribers = await db.getSubscribers();

    if (subscribers.length === 0) {
        console.log("🤷 No subscribers.");
        return;
    }

    await Promise.all(subscribers.map(async ({ email, name }) => {
        const body = await ejs.renderFile("./email.template.ejs", { email, name, newProducts });
        await Email.sendMail(email, "New products at ciernediery.sk", body);
    }));

    console.log("✅ Notifications were sent.");
}

async function main() {
    console.log("🌟 Running check.");

    try {
        const newProducts = await Ciernediery.getNewProducts();

        if (newProducts.length > 0) {
            console.log(`😃 Found ${newProducts.length} new ${newProducts.length > 1 ? "products" : "product"}.`);
            newProducts.forEach(product => `🎑 ${product.name} - ${product.price}`);

            await sendNotifications(newProducts);
        } else {
            console.log("😥 No new products detected.");
        }

        console.log("✅ Check successful.")
    } catch(err) {
        handleError(err);
        process.exit(1);
    }

    process.exit(0);
}

main();
