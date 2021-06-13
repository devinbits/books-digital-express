const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});