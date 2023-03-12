const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '640e1a8adda4a19306918694',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((err, req, res, next) => {
  console.log(err.name);
  switch (err.name) {
    case 'CastError':
      res.status(400).send({ message: 'Переданы некорректные данные' });
      break;

    case 'DataNotFoundError':
      res.status(err.statusCode).send({ message: err.message });
      break;

    default:
      res.status(500).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
