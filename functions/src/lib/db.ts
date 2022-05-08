import {Product} from "./ciernediery";
import {getFirestore} from "firebase-admin/firestore";

const PRODUCTS_KEY = "products";
const SUBSCRIBERS_KEY = "subscribers";

export type Subscriber = {
    name: string;
    email: string;
}

export async function setProducts(products: Array<Product>) {
  await getFirestore().collection(PRODUCTS_KEY).doc(PRODUCTS_KEY).set({products});
}

export async function getProducts(): Promise<Array<Product>> {
  const doc = await getFirestore().collection(PRODUCTS_KEY).doc(PRODUCTS_KEY).get();
  const {products} = await doc.data() as { products: Array<Product> };
  return products;
}

export async function getSubscribers(): Promise<Array<Subscriber>> {
  const doc = await getFirestore().collection(SUBSCRIBERS_KEY).doc(SUBSCRIBERS_KEY).get();
  const {subscribers} = await doc.data() as { subscribers: Array<Subscriber> };
  return subscribers;
}
