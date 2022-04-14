const BlogPostServices = require('../services/blogPost');

const getAll = async (req, res, next) => {
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
    const { user } = req;

    const post = await BlogPostServices.create({ title, content, categoryIds, userId: user.id });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { id: userId } = req.user;
    const { title, content } = req.body;

    const post = await BlogPostServices.update({ postId, userId, title, content });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
