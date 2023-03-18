const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, isCelebrateError } = require('celebrate');

const DataNotFoundError = require('./errors/DataNotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errors());

app.use((req, res, next) => {
  req.user = {
    _id: '640e1a8adda4a19306918694',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new DataNotFoundError('Запрашиваемый адрес не найден.'));
});

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    console.log(err);
    res.status(400).send({ message: `На сервере произошла ошибка: ${err.details.get('body').details[0].message}` });
    return;
  }

  switch (err) {
    case 'CastError':
      res.status(400).send({ message: 'Переданы некорректные данные' });
      break;

    case 'ValidationError':
      res.status(400).send({ message: 'Переданы некорректные данные' });
      break;

    case 'DataNotFoundError':
      res.status(404).send({ message: err.message });
      break;

    default:
      res.status(500).send({ message: `На сервере произошла ошибка: ${err.details}` });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
