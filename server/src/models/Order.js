import Sequelize from 'sequelize';

export default sequelize => 
  sequelize.define('Order', {
    /* 
    built-in: 
      createdAt,
      updatedAt
    */
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    // Address: Sequelize.INTEGER
  });

