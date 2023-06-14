/* require('dotenv').config(); */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const cards = require('./routes/cards');
const users = require('./routes/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validationCreateUser, validationLogin } = require('./middlewares/validations');

const { DB_CONNECT, PORT } = process.env;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов, только затем идут все обработчики роутов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);
app.use(users);
app.use(cards);

app.use(errorLogger);

app.use((req, res) => {
  res.status(404).send({ message: 'Страница  по этому адресу не найдена' });
});

mongoose.connect(DB_CONNECT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
