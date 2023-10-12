const router = require("express").Router();
const cardsData = require("../data/cards.json");

router.get("/cards", (req, res) => {
  res.json(cardsData);
});

module.exports = router;
