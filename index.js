import express, { response } from "express";
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";
// const PORT = 5555;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  // console.log("request : ", req);
  return res.status(234).send("welcome to book store backend");
});

// post a new book
app.post("/books", async (req, res) => {
  console.log("posting");
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields : title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log("DB error ====>", error);
    res.send(500).send({ message: error.message });
  }
});

// get all books from DB
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// get book by id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// route to update a book
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(500)
        .send({ message: "send all fields : title, author, publishYear" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);
    // console.log("id =>", result);

    if (!result) {
      console.log("not found");
      return res.status(404).json({ message: "book not found" });
    }

    return res.status(200).send({ message: "book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found!" });
    }
    return res.status(404).send({ message: "book deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT} ...`);
});

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("app connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
