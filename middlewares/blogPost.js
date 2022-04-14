const BlogPostServices = require('../services/blogPost');
const { createError } = require('../helpers');
const { createPostSchema, updatePostSchema } = require('../schemas/blogPost');

const validateCreatePostData = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = createPostSchema.validate({ title, content, categoryIds });

  if (error) return next(error);

  next();
};

const validateUpdatePostData = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = updatePostSchema.validate({ title, content, categoryIds });

  if (error) { console.log(error); return next(error); }

  next();
};

const validatePostUser = async (req, _res, next) => {
  try {
    const { id: postId } = req.params;
    const { id: userId } = req.user;

    const post = await BlogPostServices.getById(postId);

    if (post.userId !== userId) {
      const error = createError('Unauthorized user', 'unauthorized');
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCreatePostData,
  validateUpdatePostData,
  validatePostUser,
};
