const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

const cardsDataPath = path.join(__dirname, 'data', 'cards.json');

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
