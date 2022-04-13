const CategoryServices = require('../services/category');

const getAll = async (_req, res, next) => {
  try {
    const categories = await CategoryServices.getAll();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await CategoryServices.create(name);

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};
