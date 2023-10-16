const express = require('express'),
    router = express.Router(),
    orderController = require('../app/controllers/order.controller.js');

module.exports = router;

// get all orders
router.get('/', orderController.getAll);
// create new order
router.post('/', orderController.addOrder)
// get one order
router.get('/:id', orderController.getOne)
// delete one order
router.delete('/:id', orderController.deleteOne)