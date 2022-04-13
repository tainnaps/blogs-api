const express = require('express');
const { validatePostData } = require('../middlewares/blogPost');
const { validateTokenExistence, validateToken } = require('../middlewares/auth');
const BlogPostControllers = require('../controllers/blogPost');

const router = express.Router();

router.get(
  '/:id',
  validateTokenExistence,
  validateToken,
  BlogPostControllers.getById,
);

router.get(
  '/',
  validateTokenExistence,
  validateToken,
  BlogPostControllers.getAll,
);

router.post(
  '/',
  validateTokenExistence,
  validateToken,
  validatePostData,
  BlogPostControllers.create,
);

module.exports = router;
