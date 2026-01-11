// src/routes/customers.js
const express = require('express');
const router = express.Router();
const customersCtrl = require('../controllers/customers');

router.post('/', customersCtrl.createValidators, customersCtrl.create);
router.get('/', customersCtrl.list);
router.get('/:id', customersCtrl.getById);

module.exports = router;