// src/controllers/customers.js
const { body, validationResult } = require("express-validator");
const CustomerService = require("../services/customerService");

exports.createValidators = [
  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("firstName is required")
    .trim()
    .escape(),
  body("lastName").optional().isString().trim().escape(),
  body("email")
    .optional()
    .isEmail()
    .withMessage("email must be valid")
    .normalizeEmail(),
  body("phone").optional().isString().trim(),
];

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const created = await CustomerService.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    console.error("create customer error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.list = async (req, res) => {
  try {
    const customers = await CustomerService.list();
    return res.json(customers);
  } catch (err) {
    console.error("list customers error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const customer = await CustomerService.getById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Not found" });
    return res.json(customer);
  } catch (err) {
    console.error("get customer error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
