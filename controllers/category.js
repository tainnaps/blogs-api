const CategoryServices = require('../services/category');

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
  create,
};
