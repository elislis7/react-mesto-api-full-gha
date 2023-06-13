const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { users, login, createUser } = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');

const app = express();

app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use(users);
app.use(cards);
app.use(helmet());

app.use((req, res) => {
  res.status(404).send({ message: 'Страница  по этому адресу не найдена' });
});

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
