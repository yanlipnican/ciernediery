import {TwitterClient} from "twitter-api-client";
import {getSecret} from "./secrets";

let twitterClient: TwitterClient | null = null;

export function getTwitterClient() {
  if (!twitterClient) {
    console.log("🐥 Creating twitter client.");

    twitterClient = new TwitterClient({
      apiKey: getSecret("TWITTER_API_KEY"),
      apiSecret: getSecret("TWITTER_API_SECRET"),
      accessToken: getSecret("TWITTER_ACCESS_TOKEN"),
      accessTokenSecret: getSecret("TWITTER_ACCESS_TOKEN_SECRET"),
    });
  }
  return twitterClient;
}
