'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'customer'
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING
    });
  }
};
