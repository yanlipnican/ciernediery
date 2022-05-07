import { JSDOM } from "jsdom";
import axios from "axios";
import _ from "lodash";

import * as db from "./db.js";

const URL = "https://eshop.ciernediery.sk";

async function fetchPage() {
    const { data } = await axios.get(URL);
    return data;
}

async function parseProducts(data) {
    const dom = new JSDOM(data);

    const products = dom.window.document.querySelectorAll(".products .product");

    return Array.from(products).map(element => {
        const linkElement = element.querySelector("h3 a");
        const link = linkElement.getAttribute("href");
        const name = linkElement.textContent;

        const price = element.querySelector(".price").textContent;

        return {
            name,
            price,
            link,
        }
    });
}

export async function getProducts() {
    console.log(`⬇️  Fetching ${URL} ...`);
    const data = await fetchPage();

    console.log(`🧰 Parsing data ...`);
    const products = await parseProducts(data);

    console.log(`💡 Detected ${products.length} products.`);
    products.forEach(product => console.log(`🌅 ${product.name} - ${product.price}`));
    return products;
}

export async function getNewProducts() {
    const products = await getProducts();
    const lastProducts = await db.getProducts();

    console.log(`🧰 Comparing old products with current products ...`);

    if (_.isEqual(products, lastProducts)) {
        return [];
    }

    console.log(`🧰 Detected difference. Saving new data.`);
    await db.setProducts(products);

    const newProducts = _.differenceWith(products, lastProducts, _.isEqual);

    if (newProducts.length === 0) {
        console.log(`💡 Some products were removed from shop.`);
    }

    return newProducts;
}
