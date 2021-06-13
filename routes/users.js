const router = require("express").Router();
const { getUsers, getUserById } = require("../services/users");

router.get("/", async (req, res, next) => {
  try {
    const { page, limit, name } = req.query;
    let queryParms = {};
    if (name) queryParms.name = name;
    res.json(await getUsers(queryParms, page, limit));
  } catch (err) {
    console.error(`Error while getting Users `, err.message);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
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
