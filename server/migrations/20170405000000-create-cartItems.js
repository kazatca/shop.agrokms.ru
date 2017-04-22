'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER,
        unique: 'OrderProduct',
        allowNull: false
      },
      ProductId: {
        type: Sequelize.INTEGER,
        unique: 'OrderProduct',
        allowNull: false
      },
      qty: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      charset: 'utf8'      
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('CartItems');
  }
};