'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Comments',
   {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comment:{
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      reference: {
        model: 'User',
        key: 'id',
        as: 'user'
      }
    },
    taskId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      reference: {
        model: 'Tasks',
        key: 'id',
        as: 'tasks'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
   }
   )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments')
  }
};
