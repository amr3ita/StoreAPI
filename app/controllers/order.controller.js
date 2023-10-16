const mongoose = require('mongoose'),
    Order = require('../models/order.js'),
    Product = require('../models/product.js');

// get all orders
function getAll(req, res) {
    Order.find()
        .populate('product', 'name') // return the name of product insted of it's id
        .exec()
        .then(orders => {
            if (orders.length > 0) {
                res.status(200).json({
                    noOfOrders: orders.length,
                    orders: orders.map(order => {
                        return {
                            _id: order._id,
                            product: order.product,
                            quantity: order.quantity,
                            resource: {
                                orderResource: 'http://localhost:3000/orders',
                                url: `http://localhost:3000/orders/${order._id}`,
                                reqMethod: 'GET'
                            }
                        }
                    })
                })
            } else {
                res.status(404).json({ message: 'No Orders Found' })
            }
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })

}

// create new order
function addOrder(req, res) {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product Not Found'
                })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save();
        })
        .then(order => {
            res.status(200).json({
                message: 'Order Added Successfully',
                savedOrder: {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity
                },
                orderResource: {
                    reqMethod: 'POST',
                    url: `http://localhost:3000/orders/${order.id}`
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
}

// get one order
function getOne(req, res) {
    Order.findById(req.params.id)
        .populate('product', 'name') // return the name of product insted of it's id
        .exec()
        .then(order => {
            if (!order) {
                res.status(404).json({
                    message: 'Order Not Found'
                })
            }
            res.status(200).json({
                order: order,
                orderResource: {
                    reqMethod: 'GET',
                    url: `http://localhost:3000/orders/`
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
}

// delete one order
function deleteOne(req, res) {
    Order.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order Deleted Successfully',
                deletedOrder: result,
                orderResource: {
                    reqMethod: 'DELETE',
                    url: `http://localhost:3000/orders/`
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
}

module.exports = {
    getAll,
    addOrder,
    getOne,
    deleteOne
}