import Sequelize from 'sequelize';

export default sequelize => 
  sequelize.define('Setting', {
    key: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    value: Sequelize.STRING
  });