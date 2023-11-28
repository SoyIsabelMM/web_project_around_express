const Users = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({});

    res.json({ data: users });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Error al obtener usuarios desde la base de datos' });
  }
};

module.exports.getUserById = async (req, res) => {
  const id = req.params._id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: 'Error al obtener usuario desde la base de datos' });
  }
};
