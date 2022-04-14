const express = require('express');
const { validateUserData } = require('../middlewares/user');
const { validateToken } = require('../middlewares/auth');
const UserControllers = require('../controllers/user');

const router = express.Router();

router.get(
  '/:id',
  validateToken,
  UserControllers.getById,
);

router.get(
  '/',
  validateToken,
  UserControllers.getAll,
);

router.post(
  '/',
  validateUserData,
  UserControllers.create,
);

router.delete(
  '/me',
  validateToken,
  UserControllers.deleteById,
);

module.exports = router;
