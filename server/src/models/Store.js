import Sequelize from 'sequelize';

export default sequelize =>
  sequelize.define('Store', {
    address: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    coords: {
      type: Sequelize.STRING
    }
  });