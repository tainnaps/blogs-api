const { Category } = require('../models');

const create = async (name) => {
  const existingCategory = await Category.findOne({ where: { name } });

  if (existingCategory) {
    const error = new Error('Category already registered');
    error.type = 'conflict';

    throw error;
  }

  const category = await Category.create({ name });

  return category;
};

module.exports = {
  create,
};
