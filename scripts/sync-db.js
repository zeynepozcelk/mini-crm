// scripts/sync-db.js
// Development için: modelleri DB ile senkronize eder.
const path = require('path');
const models = require(path.join(__dirname, '..', 'src', 'models'));

async function sync() {
  try {
    await models.sequelize.authenticate();
    console.log('DB connection OK');
    await models.sequelize.sync({ alter: true });
    console.log('Models synchronized (alter: true).');
    process.exit(0);
  } catch (err) {
    console.error('Error syncing DB:', err);
    process.exit(1);
  }
}

sync();