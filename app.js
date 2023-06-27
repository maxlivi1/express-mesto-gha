const express = require('express');
const console = require('console');

const { PORT = 3000 } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log('Начинаю слушать порт:', PORT);
});
