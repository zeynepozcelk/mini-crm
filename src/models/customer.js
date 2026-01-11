// src/models/customer.js
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name", // <--- KRİTİK EKLEME: Veritabanı sütun adı
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "last_name", // <--- KRİTİK EKLEME: Veritabanı sütun adı
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active", // <--- Bunu da garantiye alalım
      },
    },
    {
      tableName: "customers",
      underscored: true, // Bu ayar timestamps (created_at) için kalsın
      timestamps: true,
    },
  );

  return Customer;
};
