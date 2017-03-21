import Sequelize from 'sequelize';

export default sequelize => 
  sequelize.define('Product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    image: Sequelize.STRING,
    price: Sequelize.INTEGER
  });

