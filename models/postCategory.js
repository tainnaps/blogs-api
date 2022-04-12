module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
  {},
  { timestamps: false, tableName: 'PostsCategories' });

  PostCategory.associate = (models) => {
    models.Post.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.Post, {
      through: PostCategory,
      as: 'posts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};
