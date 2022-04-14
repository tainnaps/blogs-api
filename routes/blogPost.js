const express = require('express');
const BlogPostControllers = require('../controllers/blogPost');
const { validateToken } = require('../middlewares/auth');
const {
  validatePostTitle,
  validatePostContent,
  validatePostCategoryIds,
  validateCategoryIdsExistence,
  validatePostUser,
} = require('../middlewares/blogPost');

const router = express.Router();

router.get(
  '/search',
  validateToken,
  BlogPostControllers.search,
);

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
  validatePostUser,
  BlogPostControllers.update,
);

router.delete(
  '/:id',
  validateToken,
  validatePostUser,
  BlogPostControllers.deleteById,
);

module.exports = router;
