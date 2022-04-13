const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi
    .string()
    .required()
    .messages({
      'any.required': '"name" is required',
    }),
});

const validateCategoryData = (req, _res, next) => {
  const { name } = req.body;

  const { error } = categorySchema.validate({ name });

  if (error) return next(error);

  next();
};

module.exports = {
  validateCategoryData,
};
