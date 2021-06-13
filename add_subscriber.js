import dotenv from "dotenv";
dotenv.config();

import * as db from "./lib/db.js";

function isParam(param) {
    return process.argv.indexOf(param) !== -1;
}

function getParamValue(param) {
    if (!isParam(param)) {
        return null;
    }

    return process.argv[process.argv.indexOf(param) + 1];
}

async function main() {
    console.log("🌟 Running add subscriber.");

    const email = getParamValue("--email");
    const name = getParamValue("--name");

    console.log(`➕ Adding ${name} with email ${email}.`);
    
    await db.addSubscriber({ email, name });

    console.log("✅ Subscriber added.")

    process.exit(0);
}

main();
