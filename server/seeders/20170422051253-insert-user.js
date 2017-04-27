'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      phone: '1112223344',
      name: 'John Doe',
      password: '$2a$10$niqcPeasLLX9q0pnsF/AOOWbCiDkVkUT4xm6FN/Rz/u1GU//TONQG', //123
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
