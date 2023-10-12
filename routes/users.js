const router = require("express").Router();
const usersData = require("../data/users.json");

router.get("/users", (req, res) => {
  res.json(usersData);
});

router.get("/users/:_id", (req, res) => {
  const id = req.params._id;
  const user = usersData.find((user) => user._id === id);

  if (!user) {
    res.status(404).json({ message: "ID de usuario no encontrado" });
  } else {
    res.json(user);
  }
});

module.exports = router;
