const { Order } = require('../models');

exports.create = async (payload) => {
  // Payload: { customerId, totalAmount, status }
  const created = await Order.create(payload);
  return created.toJSON();
};

exports.list = async () => {
  const rows = await Order.findAll({ order: [['id', 'DESC']] });
  return rows.map((r) => r.toJSON());
};

exports.getById = async (id) => {
  const row = await Order.findByPk(id);
  return row ? row.toJSON() : null;
};