const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi
    .string()
    .required()
    .messages({
      'any.required': '"title" is required',
    }),
  content: Joi
    .string()
    .required()
    .messages({
      'any.required': '"content" is required',
    }),
  categoryIds: Joi
    .array()
    .items(Joi.number().integer())
    .required()
    .messages({
      'any.required': '"categoryIds" is required',
    }),
});

const validatePostData = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = postSchema.validate({ title, content, categoryIds });

  if (error) return next(error);

  next();
};

module.exports = {
  validatePostData,
};
