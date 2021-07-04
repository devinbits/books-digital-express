const router = require("express").Router();
const { registerNewUser, loginUser } = require("../services/users");

router.post("/register", async (req, res, next) => {
  try {
    if (!req.body.email) throw new Error("No user recived! Invalid request");
    const result = await registerNewUser(req.body);
    res.json(result);
  } catch (err) {
    console.error(
      `Error while getting User with id ${req.params.id} `,
      err.message
    );
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.email) throw new Error("No user recived! Invalid request");
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err) {
    console.error(
      `Error while getting User with id ${req.params.id} `,
      err.message
    );
    next(err);
  }
});

module.exports = router;
