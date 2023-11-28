const { default: mongoose } = require('mongoose');
const Users = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({});

    console.log('traer todos', users);

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
    const user = await Users.findById(id);

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    return res.json(user);
  } catch (err) {
    if (err instanceof mongoose.CastsError) {
      return res.status(404).json({ message: 'ID de usuario no válido' });
    }

    console.error(err);
    return res
      .status(500)
      .json({ mensaje: 'Error al obtener usuario desde la base de datos' });
  }
};
