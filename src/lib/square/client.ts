import { Client, Environment } from 'square';

if (!process.env.SQUARE_ACCESS_TOKEN) {
  console.warn("Missing SQUARE_ACCESS_TOKEN environment variable");
}

export const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
  environment: Environment.Production, // Make sure to use Production since you provided production keys
});
