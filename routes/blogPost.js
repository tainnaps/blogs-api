const express = require('express');
const BlogPostControllers = require('../controllers/blogPost');
const { validateToken } = require('../middlewares/auth');
const {
  validateCreatePostData,
  validateUpdatePostData,
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
  validateCreatePostData,
  BlogPostControllers.create,
);

router.put(
  '/:id',
  validateToken,
  validatePostUser,
  validateUpdatePostData,
  BlogPostControllers.update,
);

router.delete(
  '/:id',
  validateToken,
  validatePostUser,
  BlogPostControllers.deleteById,
);

module.exports = router;
