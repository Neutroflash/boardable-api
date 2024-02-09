import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors"
import errorHandler from "./middleware/error";


if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.options("*", cors());
app.get('/', (req, res) => {
  const responseData = {
    message: 'API de Boardable'
  };
  res.json(responseData);
});