const BlogPostControllers = require('../services/blogPost');

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { user } = req;

    const post = await BlogPostControllers.create(title, content, categoryIds, user.id);

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
