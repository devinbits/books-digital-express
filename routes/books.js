const router = require("express").Router();
const { getAllBooks } = require("../services/books");

router.get("/", async (req, res, next) => {
  try {
    const { name, isbn, page, limit } = req.query;
    const queryParms = {};
    if (name) queryParms.name = name;
    if (isbn) queryParms.isbn = isbn;
    res.json(await getAllBooks(queryParms, page, limit));
  } catch (err) {
    console.error(`Error while getting Books `, err.message);
    next(err);
  }
});

module.exports = router;
