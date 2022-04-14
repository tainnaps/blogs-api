const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const { createError } = require('../helpers');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    const error = createError('Post does not exist', 'notFound');
    throw error;
  }

  return post;
};

const validateCategoryId = async (categoryId) => {
  const existingCategory = await Category.findOne({ where: { id: categoryId } });

  if (!existingCategory) {
    const error = createError('"categoryIds" not found', 'invalidFields');
    throw error;
  }
};

const create = async ({ title, content, categoryIds, userId }) => {
  let post;

  const validationPromises = categoryIds.map((categoryId) => validateCategoryId(categoryId));

  await Promise.all(validationPromises);

  await sequelize.transaction(async (transaction) => {
    post = await BlogPost.create(
      { title, content, userId },
      { transaction },
    );

    /*
      Usei o link abaixo como referência para utilizar loops e promises dentro da transaction (async callback), além de contar com a explicação do William Marques na monitoria.
      link: https://stackoverflow.com/questions/35705622/using-loops-and-promises-in-transactions-in-sequelize
    */
    const createPromises = categoryIds.map((categoryId) => PostCategory.create(
      { postId: post.id, categoryId },
      { transaction },
    ));

    await Promise.all(createPromises);
  });

  return post;
};

const update = async ({ id, title, content }) => {
  await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });

  const updatedPost = BlogPost.findOne({
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: [{
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return updatedPost;
};

const deleteById = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

const search = async (searchTerm) => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!searchTerm) return posts;

  const filteredPosts = posts
    .filter(({ title, content }) => title.includes(searchTerm) || content.includes(searchTerm));

  return filteredPosts;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  search,
};
