const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const notFoundPageRouter = require('./routes/notFoundPage');
const { login, registration } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const DB_PATH = 'mongodb://127.0.0.1:27017/';
const DB_NAME = 'mestodb';

const app = express();
mongoose.connect(`${DB_PATH}${DB_NAME}`, {
  useNewUrlParser: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', registration);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('*', notFoundPageRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Слушаю порт:', PORT);
});
