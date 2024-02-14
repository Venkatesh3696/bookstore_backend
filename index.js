import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { PORT } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import { allowedOrigins } from "./config.js";
const app = express();
dotenv.config();

app.use(express.json());

// to handle CORS errors
// app.use(cors());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["ContentType"],
  })
);

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
