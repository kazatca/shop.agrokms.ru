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
    }
  });

