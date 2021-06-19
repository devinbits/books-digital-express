const router = require("express").Router();
const { getPublishers, getPublisherById } = require("../services/publishers");

router.get("/", async (req, res, next) => {
  try {
    const { page, limit, name } = req.query;
    let queryParms = {};
    if (name) queryParms.name = name;
    res.json(await getPublishers(queryParms, page, limit));
  } catch (err) {
    console.error(`Error while getting Publishers `, err.message);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await getPublisherById(id));
  } catch (err) {
    console.error(`Error while getting Publishers `, err.message);
    next(err);
  }
});

module.exports = router;
