// src/config/index.js
require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || "development";

const base = {
  app: {
    port: Number(process.env.PORT || 3000),
    env: NODE_ENV,
  },
  logger: {
    level: process.env.LOG_LEVEL || "debug",
  },
  db: {
    dialect: process.env.DB_DIALECT || "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || "mini_crm",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || null,
    use_env_variable: !!process.env.DATABASE_URL,
    logging: process.env.DB_LOGGING === "true" || NODE_ENV === "development",
  },
};

// NOT: burada development için `db: {}` gibi boş bir nesne koymayın —
// çünkü spread işleminde base.db üzerine yazılır ve db alanları kaybolur.
const envOverrides = {
  development: {
    // boş bırakıyoruz (varsa sadece spesifik override'lar ekleyin)
  },
  test: {
    app: { port: Number(process.env.PORT || 3001) },
    db: {
      database: process.env.DB_NAME || "mini_crm_test",
      logging: false,
    },
    logger: { level: process.env.LOG_LEVEL || "warn" },
  },
  production: {
    app: { port: Number(process.env.PORT || 3000) },
    db: {
      logging: false,
    },
    logger: { level: process.env.LOG_LEVEL || "info" },
  },
};

// Basit shallow merge yeterli: envOverrides içindeki boş db nesneleri base.db'yi bozmayacak.
const config = {
  ...base,
  ...(envOverrides[NODE_ENV] || {}),
};

module.exports = config;
