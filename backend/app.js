require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const router = require('./routes/router');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validationCreateUser, validationLogin } = require('./middlewares/validations');
const handelError = require('./middlewares/handelError');

const {
  DB_CONNECT = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов, только затем идут все обработчики роутов

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);
app.use(router);

app.use(errors());
app.use(handelError);

app.use(errorLogger);

mongoose.connect(DB_CONNECT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
