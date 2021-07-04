const express = require("express");
const passport = require("passport");
const { configurePassport, authenticate } = require("./midlewares/passport");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./midlewares/errorHandler");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const publisherRouter = require("./routes/publishers");
const authRouter = require("./routes/auth");
const path = require("path");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

/**
 * -------------- REQ LIMIT ----------------
 */

const reqLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 15, // limit each IP to 15 requests per windowMs
});
app.use(reqLimiter);
app.use(cors());
/**
 * -------------- PASSPORT AUTH ----------------
 */

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

app.use(express.static(path.join(__dirname, "express-console/build")));

app.use("/auth", authRouter);
app.use("/users", authenticate(passport), userRouter);
app.use("/books", authenticate(passport), bookRouter);
app.use("/publishers", authenticate(passport), publisherRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "express-console/build", "index.html"));
});

/**
 * -------------- Error Handler ----------------
 */
app.use(errorHandler);

/**
 * -------------- SERVER ----------------
 */
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
