module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'customer_id' // <--- KRİTİK: Veritabanındaki snake_case karşılığı
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'total_amount' // <--- KRİTİK: Veritabanındaki snake_case karşılığı
    },
  }, {
    tableName: 'orders',
    underscored: true,
    timestamps: true
  });

  return Order;
};