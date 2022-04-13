const express = require('express');
const { validateCategoryData } = require('../middlewares/category');
const { validateTokenExistence, validateToken } = require('../middlewares/auth');
const CategoryControllers = require('../controllers/category');

const router = express.Router();

router.get(
  '/',
  validateTokenExistence,
  validateToken,
  CategoryControllers.getAll,
);

router.post(
  '/',
  validateTokenExistence,
  validateToken,
  validateCategoryData,
  CategoryControllers.create,
);

module.exports = router;
