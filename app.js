const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { sendError } = require('./errors/sendError');
const { ERRORS } = require('./utils/constants');
const throwError = require('./errors/throwError');

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

app.get('*', (req, res) => {
  sendError(throwError(ERRORS.NOT_FOUND_PAGE_ERROR.name), res);
});
app.put('*', (req, res) => {
  sendError(throwError(ERRORS.NOT_FOUND_PAGE_ERROR.name), res);
});
app.patch('*', (req, res) => {
  sendError(throwError(ERRORS.NOT_FOUND_PAGE_ERROR.name), res);
});
app.delete('*', (req, res) => {
  sendError(throwError(ERRORS.NOT_FOUND_PAGE_ERROR.name), res);
});
app.post('*', (req, res) => {
  sendError(throwError(ERRORS.NOT_FOUND_PAGE_ERROR.name), res);
});

app.listen(PORT, () => {
  console.log('Слушаю порт:', PORT);
});
