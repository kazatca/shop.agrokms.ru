'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [{
      name: 'Coffee',
      price: 5000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Burger',
      price: 13000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
