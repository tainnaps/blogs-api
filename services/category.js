const { Category } = require('../models');

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

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
  getAll,
  create,
};
