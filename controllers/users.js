const { default: mongoose } = require('mongoose');
const Users = require('../models/user');

const NOT_FOUND = 404;
const SERVEL_ERROR = 500;

module.exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({});

    console.log('traer todos', users);

    res.json({ data: users });
  } catch (err) {
    console.error(err);
    res
      .status(SERVEL_ERROR)
      .json({ message: 'Error al obtener usuarios desde la base de datos' });
  }
};

module.exports.getUserById = async (req, res) => {
  const id = req.params._id;

  try {
    const user = await Users.findById(id);

    console.log(user);

    if (!user) {
      return res
        .status(NOT_FOUND)
        .json({ message: 'ID de usuario no encontrado' });
    }

    return res.json(user);
  } catch (err) {
    if (err instanceof mongoose.CastsError) {
      return res.status(NOT_FOUND).json({ message: 'ID de usuario no válido' });
    }

    console.error(err);
    return res
      .status(SERVEL_ERROR)
      .json({ mensaje: 'Error al obtener usuario desde la base de datos' });
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  try {
    await Users.create({ name, about, avatar });

    return res.status(201).json({ name, about, avatar });
  } catch (err) {
    console.error(err);

    return res
      .status(SERVEL_ERROR)
      .json({ message: 'Error al crear un nuevo usuario' });
  }
};
