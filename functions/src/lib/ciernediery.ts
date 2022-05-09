import {JSDOM} from "jsdom";
import axios from "axios";
import {isEqual, differenceWith} from "lodash";

import * as db from "./db";

const URL = "https://eshop.ciernediery.sk";

async function fetchPage() {
  const {data} = await axios.get(URL);
  return data;
}

export type Product = {
    name: string;
    price: string;
    link: string;
};

function parseErrorMessage() {
  console.log("❌ Detected change in HTML, can't parse page.");
}

function parseProduct(element: Element): Product | undefined {
  const linkElement = element.querySelector("h3 a");
  const priceElement = element.querySelector(".price");

  if (!linkElement || !priceElement) {
    return undefined;
  }

  const link = linkElement.getAttribute("href") ?? undefined;
  const name = linkElement.textContent ?? undefined;
  const price = priceElement.textContent ?? undefined;

  if (!link || !name || !price) {
    console.log(`❌ Missing link: ${link} name: ${name} price: ${price}.`);
    return undefined;
  }

  return {
    name,
    price,
    link,
  };
}

async function parseProducts(data: string) {
  const dom = new JSDOM(data);

  const products = dom.window.document.querySelectorAll(".products .product");

  if (products.length === 0) {
    parseErrorMessage();
  }

  return Array.from(products)
      .map(parseProduct)
      .filter((product) => {
        if (!product) {
          parseErrorMessage();
        }

        return !!product;
      }) as Array<Product>;
}

export async function getProducts() {
  console.log(`⬇️  Fetching ${URL} ...`);
  const data = await fetchPage();

  console.log("🧰 Parsing data ...");
  const products = await parseProducts(data);

  console.log(`💡 Detected ${products.length} products.`);
  products.forEach((product) =>
    console.log(`🌅 ${product.name} - ${product.price}`)
  );
  return products;
}

export async function getNewProducts() {
  const products = await getProducts();

  console.log("🛢 Fetching products from database.");

  const lastProducts = await db.getProducts();

  console.log("🧰 Comparing old products with current products ...");

  if (isEqual(products, lastProducts)) {
    return [];
  }

  console.log("🧰 Detected difference. Saving new data.");
  await db.setProducts(products);

  const newProducts = differenceWith(products, lastProducts, isEqual);

  if (newProducts.length === 0) {
    console.log("💡 Some products were removed from shop.");
  }

  return newProducts;
}
