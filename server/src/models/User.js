import Sequelize from 'sequelize';

export default sequelize => 
  sequelize.define('User', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: Sequelize.STRING,
    tmpPassword: Sequelize.STRING,
    address: Sequelize.STRING,
    role: {
      type: Sequelize.STRING,
      validate: {isIn: {msg: 'wrong role', args: [[
        'admin', 
        'customer'
      ]]}}
    }
  });

