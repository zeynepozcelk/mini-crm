const express = require("express"); // Bu eksikse ekle
const router = express.Router();
const OrderController = require("../controllers/orders"); // Sadece bir tane kalsın

// ... geri kalan kodlar aynı kalsın

// Listeleme
router.get("/", OrderController.list);

// Sipariş Oluşturma
router.post("/", OrderController.createValidators, OrderController.create);

module.exports = router;
