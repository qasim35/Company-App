'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        // userId: {
        //   type: Sequelize.INTEGER,
        //   onDelete: 'cascade',
        //   reference: {
        //     model: 'User',
        //     key: 'id',
        //     as: 'user'
        //   }
        // },
       
        
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies')
  }
};
