const Cards = require('../models/card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Cards.find({});

    return res.json({ cards });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
