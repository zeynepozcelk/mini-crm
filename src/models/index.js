// src/models/index.js
const { Sequelize } = require("sequelize");
const path = require("path");
const logger = require("../lib/logger");

// Çevresel değişkeni al (development, test, production)
const env = process.env.NODE_ENV || "development";

// config.json dosyasını açıkça ve doğru yoldan yükle
const configData = require(path.resolve(__dirname, "../config.json"));
const config = configData[env]; 

let sequelize;

// Hata alınan config.db kontrolü yerine doğrudan config nesnesi kullanılıyor
if (config.use_env_variable && process.env[config.use_env_variable]) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port || 5432,
      dialect: config.dialect || "postgres",
      logging: (msg) => logger.debug(msg),
      // pool ve diğer opsiyonlar config içinden otomatik yayılır
      ...config 
    }
  );
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelleri tanımla
db.Customer = require("./customer")(sequelize, Sequelize.DataTypes);
db.Order = require("./order")(sequelize, Sequelize.DataTypes);

// İlişkileri kur
db.Customer.hasMany(db.Order, { foreignKey: "customerId" });
db.Order.belongsTo(db.Customer, { foreignKey: "customerId" });

module.exports = db;