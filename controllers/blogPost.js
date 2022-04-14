const BlogPostServices = require('../services/blogPost');

const getAll = async (_req, res, next) => {
  try {
    const posts = await BlogPostServices.getAll();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await BlogPostServices.getById(id);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const post = await BlogPostServices.create({ title, content, categoryIds, userId });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await BlogPostServices.update({ id, title, content });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await BlogPostServices.deleteById(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { q: searchTerm } = req.query;

    const posts = await BlogPostServices.search(searchTerm);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  search,
};
