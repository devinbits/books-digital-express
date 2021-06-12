const router = require("express").Router();
const { getAllUsers } = require("../services/users");

router.get("/", async (req, res, next) => {
  try {
    res.json(await getAllUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting Users `, err.message);
    next(err);
  }
});

module.exports = router
