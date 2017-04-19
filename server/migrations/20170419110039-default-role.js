'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'customer',
      validate: {isIn: {msg: 'wrong role', args: [[
        'admin', 
        'customer'
      ]]}}
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING,
      validate: {isIn: {msg: 'wrong role', args: [[
        'admin', 
        'customer'
      ]]}}
    });
  }
};
