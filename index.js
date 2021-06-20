const express = require("express");
const passport = require("passport");
const { configurePassport, authenticate } = require("./midlewares/passport");
const errorHandler = require("./midlewares/errorHandler");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const publisherRouter = require("./routes/publishers");
const authRouter = require("./routes/auth");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 80;

// Pass the global passport object into the configuration function
configurePassport(passport);
// initialize the passport object on every request
app.use(passport.initialize());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * -------------- ROUTES ----------------
 */
app.use("/auth", authRouter);
app.use("/users", authenticate(passport), userRouter);
app.use("/books", authenticate(passport), bookRouter);
app.use("/publishers", authenticate(passport), publisherRouter);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

/**
 * -------------- Error Handler ----------------
 */
app.use(errorHandler);

/**
 * -------------- SERVER ----------------
 */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
