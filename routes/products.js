const express = require('express'),
    router = express.Router(),
    productController = require('../app/controllers/product.controller.js');

module.exports = router

// localhost:3000/products
router.get('/', productController.getAll);
// create new product
router.post('/', productController.addProduct)
// get single product
router.get('/:id', productController.getOne)
// update single product
router.patch('/:id', productController.updateOne)
// delete product
router.delete('/:id', productController.deleteOne)