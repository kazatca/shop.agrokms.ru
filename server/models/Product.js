export default (sequelize, DataTypes) => 
  sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: DataTypes.STRING,
    price: DataTypes.INTEGER
  });

