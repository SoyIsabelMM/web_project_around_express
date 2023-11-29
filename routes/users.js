const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  const id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'ID de usuario no válido' });
  }

  next();
};

router.get('/users', getUsers);
router.get('/users/:_id', validateObjectId, getUserById);
router.post('/users', createUser);

module.exports = router;
