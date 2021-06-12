import Redis from "redis";
import { URL } from "whatwg-url";
import { promisify } from "util";

let _redis_client = null;

async function getRedisClient() {
    if (!_redis_client) {
        const redisUrl = new URL(process.env.REDISTOGO_URL);
        console.log("🟥 Creating redis client...");
        const redis = Redis.createClient(redisUrl.port, redisUrl.hostname);
        
        console.log(`🟥 Authenticating ${redisUrl.hostname}:${redisUrl.port}...`);
        await promisify(redis.auth).bind(redis)(redisUrl.password);
        console.log(`🟥 Successfull`);

        _redis_client = redis;

        if (process) {
            process.on("exit", cleanup);
            process.on("SIGINT", cleanup);
            process.on("SIGTERM", cleanup);
        }
    }
    return _redis_client;
}

async function cleanup() {
    if (!_redis_client) {
        return;
    }
    console.log(`🟥 Removing redis connection.`);
    _redis_client.quit();

}

const PRODUCTS_KEY = "products";
const SUBSCRIBERS_KEY = "subscribers";

export async function setProducts(products) {
    const redis = await getRedisClient();
    await promisify(redis.set).bind(redis)(PRODUCTS_KEY, JSON.stringify(products));
}

export async function getProducts() {
    const redis = await getRedisClient();
    const products = JSON.parse(await promisify(redis.get).bind(redis)(PRODUCTS_KEY));
    return products || [];
}

export async function setSubscribers(subscribers) {
    const redis = await getRedisClient();
    await promisify(redis.set).bind(redis)(SUBSCRIBERS_KEY, JSON.stringify(subscribers));
}

export async function getSubscribers() {
    const redis = await getRedisClient();
    const subscribers = JSON.parse(await promisify(redis.get).bind(redis)(SUBSCRIBERS_KEY));
    return subscribers || [];
}

export async function addSubscriber(subscriber) {
    const subscribers = await getSubscribers();
    const newSubscribers = subscribers.concat(subscriber);
    await setSubscribers(newSubscribers);
}

export async function removeSubscriber(email) {
    const subscribers = await getSubscribers();
    const newSubscribers = subscribers.filter((subscriber) => email !== subscriber.email);
    await setSubscribers(newSubscribers);
}
