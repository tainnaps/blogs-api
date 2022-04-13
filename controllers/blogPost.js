const BlogPostServices = require('../services/blogPost');

const getAll = async (req, res, next) => {
  try {
    const posts = await BlogPostServices.getAll();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { user } = req;

    const post = await BlogPostServices.create(title, content, categoryIds, user.id);

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};
