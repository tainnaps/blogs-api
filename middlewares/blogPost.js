const Joi = require('joi');
const BlogPostServices = require('../services/blogPost');
const { createError } = require('../helpers');

const titleSchema = Joi.object({
  title: Joi
    .string()
    .required()
    .messages({
      'any.required': '"title" is required',
    }),
});

const contentSchema = Joi.object({
  content: Joi
    .string()
    .required()
    .messages({
      'any.required': '"content" is required',
    }),
});

const categoryIdsSchema = Joi.object({
  categoryIds: Joi
    .array()
    .items(Joi.number().integer())
    .required()
    .messages({
      'any.required': '"categoryIds" is required',
    }),
});

const validatePostTitle = (req, _res, next) => {
  const { title } = req.body;

  const { error } = titleSchema.validate({ title });

  if (error) return next(error);

  next();
};

const validatePostContent = (req, _res, next) => {
  const { content } = req.body;

  const { error } = contentSchema.validate({ content });

  if (error) return next(error);

  next();
};

const validatePostCategoryIds = (req, _res, next) => {
  const { categoryIds } = req.body;

  const { error } = categoryIdsSchema.validate({ categoryIds });

  if (error) return next(error);

  next();
};

const validateCategoryIdsExistence = (req, _res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds) {
    const error = createError('Categories cannot be edited', 'invalidFields');
    return next(error);
  }

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
  validatePostTitle,
  validatePostContent,
  validatePostCategoryIds,
  validateCategoryIdsExistence,
  validatePostUser,
};
