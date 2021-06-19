const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const publisherRouter = require("./routes/publishers");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/publishers", publisherRouter);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
