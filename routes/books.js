const router = require("express").Router();
const { getBooks, getBooksById } = require("../services/books");

router.get("/", async (req, res, next) => {
  try {
    const { name, isbn, page, limit } = req.query;
    const queryParms = {};
    if (name) queryParms.name = name;
    if (isbn) queryParms.isbn = isbn;
    res.json(await getBooks(queryParms, page, limit));
  } catch (err) {
    console.error(`Error while getting Books `, err.message);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await getBooksById(id));
  } catch (err) {
    console.error(`Error while getting Books `, err.message);
    next(err);
  }
});

module.exports = router;
