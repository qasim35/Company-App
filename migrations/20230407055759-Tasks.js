'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Tasks',{
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    status:{
      type: Sequelize.ENUM('open','closed','In-progress'),
      defaultValue: 'open'
    },
   

    locationId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      reference: {
        model: 'Locations',
        key: 'id',
        as: 'location'
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
   })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('Tasks')
  }
};
