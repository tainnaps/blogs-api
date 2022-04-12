'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'PostsCategories',
      {
        postId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'BlogPosts',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        categoryId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Categories',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};
