const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const DB_PATH = 'mongodb://127.0.0.1:27017/';
const DB_NAME = 'mestodb';

const app = express();
mongoose.connect(`${DB_PATH}${DB_NAME}`, {
  useNewUrlParser: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '649ea0a00c567ed792814472' };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT, () => {
  console.log('Слушаю порт:', PORT);
});
