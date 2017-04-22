'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Settings', {
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      value: Sequelize.STRING,
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

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};
