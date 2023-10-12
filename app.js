const express = require("express");
const users = require("./routes/users.js");
const cards = require("./routes/cards.js");

const fs = require("fs");
const path = require("path");

const { PORT = 3000 } = process.env;

const app = express();

app.use("/", users, cards);

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
