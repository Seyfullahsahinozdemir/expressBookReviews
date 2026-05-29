const express = require("express");
const axios = require("axios");

const public_users = express.Router();

const baseURL = "http://localhost:5000";

// Get all books (async/await)
public_users.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/`);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get book by ISBN (async/await)
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`${baseURL}/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get books by author (promise callback)
public_users.get("/author/:author", (req, res) => {
  const author = req.params.author;

  axios
    .get(`${baseURL}/`)
    .then((response) => {
      const books = response.data;
      let result = {};

      for (let id in books) {
        if (books[id].author.toLowerCase() === author.toLowerCase()) {
          result[id] = books[id];
        }
      }

      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

// Get books by title (promise callback)
public_users.get("/title/:title", (req, res) => {
  const title = req.params.title;

  axios
    .get(`${baseURL}/`)
    .then((response) => {
      const books = response.data;
      let result = {};

      for (let id in books) {
        if (books[id].title.toLowerCase() === title.toLowerCase()) {
          result[id] = books[id];
        }
      }

      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

// Get reviews by ISBN (async/await)
public_users.get("/review/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`${baseURL}/review/${isbn}`);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports.general = public_users;
