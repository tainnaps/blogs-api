const express = require('express');
const BlogPostControllers = require('../controllers/blogPost');
const { validateToken } = require('../middlewares/auth');
const {
  validatePostTitle,
  validatePostContent,
  validatePostCategoryIds,
  validateCategoryIdsExistence,
} = require('../middlewares/blogPost');

const router = express.Router();

router.get(
  '/:id',
  validateToken,
  BlogPostControllers.getById,
);

router.get(
  '/',
  validateToken,
  BlogPostControllers.getAll,
);

router.post(
  '/',
  validateToken,
  validatePostTitle,
  validatePostContent,
  validatePostCategoryIds,
  BlogPostControllers.create,
);

router.put(
  '/:id',
  validateToken,
  validatePostTitle,
  validatePostContent,
  validateCategoryIdsExistence,
  BlogPostControllers.update,
);

module.exports = router;
