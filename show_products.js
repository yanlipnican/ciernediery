import dotenv from "dotenv";
dotenv.config();

import * as ciernediery from "./lib/ciernediery.js";

async function main() {
    await ciernediery.getProducts();
    
    process.exit(0);
}

main();
