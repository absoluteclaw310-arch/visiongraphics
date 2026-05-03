import { SquareClient, SquareEnvironment } from 'square';

if (!process.env.SQUARE_ACCESS_TOKEN) {
  console.warn("Missing SQUARE_ACCESS_TOKEN environment variable");
}

export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN || '',
  environment: SquareEnvironment.Production, // Make sure to use Production since you provided production keys
});
