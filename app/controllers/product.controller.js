const Product = require('../models/product'),
    mongoose = require('mongoose');

// add new product
function addProduct(req, res, nex) {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(product => {
            res.status(200).json({
                message: 'Product Added Successfully',
                createdProduct: product
            })
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })
}

// get all products
function getAll(req, res) {
    Product.find({})
        .select('name price')
        .then(products => {
            if (products.length > 0) {
                res.status(200).
                    json({
                        message: 'products retrieved successfully',
                        products: products
                    })
            } else {
                res.status(404).json({ message: 'No Products Found' })
            }
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })
}

// get single product
function getOne(req, res, next) {
    const id = req.params.id;
    Product.findById(id)
        .select('name price createdAt')
        .then(product => {
            if (product) {
                res.status(200).json({
                    message: 'required product',
                    product: product
                })
            } else {
                res.status(404).json({ message: 'product not found' })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
}

// update product
function updateOne(req, res, next) {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .select('name price updatedAt')
        .then(updatedProduct => {
            if (updatedProduct) {
                res.status(200).json({
                    message: 'product updated successfully',
                    updatedProduct: updatedProduct
                })
            } else {
                res.status(404).json({ message: 'product not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
}

// delete product
function deleteOne(req, res, next) {
    const id = req.params.id
    Product.deleteOne({ _id: id })
        .exec()
        .then(deletedResult => {
            res.status(200).json({
                message: 'product deleted',
                deletedResult
            })
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
}

module.exports = {
    addProduct,
    getAll,
    getOne,
    updateOne,
    deleteOne
}