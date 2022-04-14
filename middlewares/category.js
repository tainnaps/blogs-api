const { categorySchema } = require('../schemas/category');

const validateCategoryData = (req, _res, next) => {
  const { name } = req.body;

  const { error } = categorySchema.validate({ name });

  if (error) return next(error);

  next();
};

module.exports = {
  validateCategoryData,
};
