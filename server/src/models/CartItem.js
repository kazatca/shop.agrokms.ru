import Sequelize from 'sequelize';

export default sequelize =>
  sequelize.define('CartItem', {
    OrderId: {
      type: Sequelize.INTEGER,
      unique: 'OrderProduct',
      allowNull: false
    },
    ProductId: {
      type: Sequelize.INTEGER,
      unique: 'OrderProduct',
      allowNull: false
    },
    qty: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
        min: 1
      }
    }

  });