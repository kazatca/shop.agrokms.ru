'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      phone: '+7(111)222-33-44',
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
