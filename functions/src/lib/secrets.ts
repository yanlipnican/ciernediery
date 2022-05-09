/**
 * Secrets that are provided by GCP secret manager.
 * https://console.cloud.google.com/security/secret-manager
 */
const secrets = <const>[
  "TWITTER_API_KEY",
  "TWITTER_API_SECRET",
  "TWITTER_ACCESS_TOKEN",
  "TWITTER_ACCESS_TOKEN_SECRET",
];

export function getSecretsList(): Array<string> {
  return secrets as unknown as Array<string>;
}

export function getSecret(key: typeof secrets[number]): string {
  return process.env[key]!;
}
