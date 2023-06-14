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

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов, только затем идут все обработчики роутов

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);
app.use(users);
app.use(cards);

app.use(errorLogger);

app.use((req, res) => {
  res.status(404).send({ message: 'Страница  по этому адресу не найдена' });
});

mongoose.connect(/* DB_CONNECT вместо */ 'mongodb://127.0.0.1:27017/mestodb');

app.listen(/* PORT вместо */ 3000, () => {
  console.log('Server is running on port 3000');
});
