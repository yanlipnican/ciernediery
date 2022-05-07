import dotenv from "dotenv";
dotenv.config();

import * as db from "./lib/db.js";

async function main() {
    const subscribers = await db.getSubscribers();

    subscribers.forEach(subscriber => console.log(`${subscriber.name} - ${subscriber.email}`));

    process.exit(0);
}

main();
