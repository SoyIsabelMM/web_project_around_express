const fs = require('fs');
const path = require('path');

const express = require('express');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

const userDataPath = path.join(__dirname, 'data', 'users.json');
const cardsDataPath = path.join(__dirname, 'data', 'cards.json');

app.get('/users', (req, res) => {
  fs.readFile(userDataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    const users = JSON.parse(data);

    return res.json({ users });
  });
});

app.get('/cards', (req, res) => {
  fs.readFile(cardsDataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    const cards = JSON.parse(data);

    return res.json({ cards });
  });
});

app.use('/', usersRoute, cardsRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
