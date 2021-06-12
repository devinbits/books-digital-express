const router = require("express").Router();
const { getAllUsers, getUserById } = require("../services/users");

router.get("/", async (req, res, next) => {
  try {
    res.json(await getAllUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting Users `, err.message);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(
      `Error while getting User with id ${req.params.id} `,
      err.message
    );
    next(err);
  }
});

module.exports = router;