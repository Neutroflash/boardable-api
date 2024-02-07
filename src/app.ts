import { configDotenv } from "dotenv";
import express from "express";
import errorHandler from "./middleware/error";


if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

app.use(express.json());
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('API de Boardable');
});