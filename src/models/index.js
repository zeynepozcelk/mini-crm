// src/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config');
const logger = require('../lib/logger');

// console.log('LOADED CONFIG.DB =>', JSON.stringify(config.db, null, 2)); // debug: kaldırılabilir

let sequelize;

if (config.db.use_env_variable && process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: config.db.dialect || 'postgres',
    logging: config.db.logging ? (msg) => logger.debug(msg) : false
  });
} else {
  sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
      host: config.db.host,
      port: config.db.port,
      dialect: config.db.dialect || 'postgres', // burada fallback eklendi
      logging: config.db.logging ? (msg) => logger.debug(msg) : false
    }
  );
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Customer = require('./customer')(sequelize, Sequelize.DataTypes);
db.Order = require('./order')(sequelize, Sequelize.DataTypes);

db.Customer.hasMany(db.Order, { foreignKey: 'customerId' });
db.Order.belongsTo(db.Customer, { foreignKey: 'customerId' });

module.exports = db;