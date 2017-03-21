import Sequelize from 'sequelize';

export default sequelize => 
  sequelize.define('Category', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });

