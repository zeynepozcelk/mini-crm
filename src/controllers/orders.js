const { body, validationResult } = require("express-validator");
const OrderService = require("../services/orderService");

// Validasyon kuralları
exports.createValidators = [
  body("customerId").isInt().withMessage("customerId must be an integer"),
  body("totalAmount")
    .isFloat({ min: 0 })
    .withMessage("totalAmount must be a positive number"),
];

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const created = await OrderService.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    console.error("create order error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.list = async (req, res) => {
  try {
    const orders = await OrderService.list();
    return res.json(orders);
  } catch (err) {
    console.error("list orders error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
