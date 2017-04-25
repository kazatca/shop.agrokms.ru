'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'address', {
      type: Sequelize.STRING,
      defaultValue: ''
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'address', {
      type: Sequelize.STRING
    });
  }
};
