import express from "express";
import { Book } from "../model/bookModel.js";
const booksRoute = express.Router();

// post a new book
booksRoute.post("/", async (req, res) => {
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
    res.status(500).send({ message: error.message });
  }
});

// get all books from DB
booksRoute.get("/", async (req, res) => {
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
booksRoute.get("/:id", async (req, res) => {
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
booksRoute.put("/:id", async (req, res) => {
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

// delete a book
booksRoute.delete("/:id", async (req, res) => {
  console.log("delete accessed");
  try {
    const { id } = req.params;
    console.log("backend => ", id);
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found!" });
    }
    return res.status(200).send({ message: "book deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default booksRoute;
