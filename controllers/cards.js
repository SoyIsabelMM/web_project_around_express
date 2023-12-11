const Cards = require('../models/card');
const User = require('../models/user');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Cards.find({});

    return res.json({ cards });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.headers['user'];

  if (!name || !link) {
    return res.status(400).json({ message: 'Información no encontrado' });
  }

  try {
    await Cards.create({ name, link, owner: ownerId });

    return res.status(201).json({ name, link, owner: ownerId });
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ message: 'Error al crear una nueva tarjeta' });
  }
};
