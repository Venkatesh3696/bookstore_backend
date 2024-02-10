import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { PORT } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
const app = express();
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  // console.log("request : ", req);
  return res.status(234).send("welcome to book store backend");
});

app.use("/books", booksRoute);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT} ...`);
});

const mongoDBUrl = process.env.mongoDBUrl;
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("app connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
