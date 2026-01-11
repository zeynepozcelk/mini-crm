// src/services/customerService.js
const { Customer } = require('../models');

exports.create = async (payload) => {
  const created = await Customer.create({
    firstName: payload.firstName,
    lastName: payload.lastName,
    phone: payload.phone,
    email: payload.email,
    address: payload.address
  });
  return created.toJSON();
};

exports.list = async () => {
  const rows = await Customer.findAll({ order: [['id', 'ASC']] });
  return rows.map((r) => r.toJSON());
};

exports.getById = async (id) => {
  const row = await Customer.findByPk(id);
  return row ? row.toJSON() : null;
};