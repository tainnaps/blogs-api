const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
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
    const error = new Error('Post does not exist');
    error.type = 'notFound';

    throw error;
  }

  return post;
};

const validateCategoryId = async (categoryId) => {
  const existingCategory = await Category.findOne({ where: { id: categoryId } });

  if (!existingCategory) {
    const error = new Error('"categoryIds" not found');
    error.type = 'invalidFields';

    throw error;
  }
};

const create = async (title, content, categoryIds, userId) => {
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

module.exports = {
  getAll,
  getById,
  create,
};
