const express = require('express');
const { validateCategoryData } = require('../middlewares/category');
const { validateToken } = require('../middlewares/auth');
const CategoryControllers = require('../controllers/category');

const router = express.Router();

router.get(
  '/',
  validateToken,
  CategoryControllers.getAll,
);

router.post(
  '/',
  validateToken,
  validateCategoryData,
  CategoryControllers.create,
);

module.exports = router;
