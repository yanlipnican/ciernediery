import {TwitterClient} from "twitter-api-client";

let twitterClient: TwitterClient | null = null;

export function getTwitterClient() {
  if (!twitterClient) {
    console.log("🐥 Creating twitter client.");

    twitterClient = new TwitterClient({
      apiKey: process.env.TWITTER_API_KEY!,
      apiSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });
  }
  return twitterClient;
}
