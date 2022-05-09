import {Product} from "./ciernediery";
import {getFirestore} from "firebase-admin/firestore";

const PRODUCTS_KEY = "products";

export async function setProducts(products: Array<Product>) {
  await getFirestore().collection(PRODUCTS_KEY).doc(PRODUCTS_KEY).set({products});
}

export async function getProducts(): Promise<Array<Product>> {
  const doc = await getFirestore().collection(PRODUCTS_KEY).doc(PRODUCTS_KEY).get();
  const {products} = doc.data() as { products: Array<Product> };
  return products;
}
