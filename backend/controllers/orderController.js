const Orders = require('../models/orderModel')
const Products = require('../models/productModel')
// const Users = require('../models/userModel')
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// Create a new Order
exports.newOrder = catchAsyncErrors( async (req, res, next) => {
    const {
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        ItemsPrice, 
        taxPrice,
        shippingPrice, 
        totalPrice 
    } = req.body

    const order = await Orders.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        ItemsPrice, 
        taxPrice,
        shippingPrice, 
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })
})

// Get an order
exports.getSingleOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Orders.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('Order not found with this Id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get all orders of a user
exports.getMyOrders = catchAsyncErrors( async(req, res, next) => {
    const orders = await Orders.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders
    })
})

// Get all orders --> Admin
exports.getAllOrders = catchAsyncErrors( async(req, res, next) => {
    const orders = await Orders.find()

    let totalAmount = 0

    orders.forEach(order => totalAmount += order.totalPrice)

    res.status(200).json({
        success: true,
        orders
    })
})

// Update order status --> Admin
exports.updateOrder = catchAsyncErrors( async(req, res, next) => {
    const order = await Orders.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404))
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order is already Delivered', 404))
    }

    if (req.body.status === 'Shipped') {
        order.orderItems.forEach(async orderItem => {
            await updateStock(orderItem.product, orderItem.quantity)
        })
    }

    order.orderStatus = req.body.status

    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

async function updateStock(productId, quantity) {
    const product = await Products.findById(productId)

    product.stock -= quantity

    await product.save({ validateBeforeSave: false })
}

// Delete an order --> Admin
exports.deleteOrder = catchAsyncErrors( async(req, res, next) => {
    const order = await Orders.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404))
    }

    await Orders.deleteOne({ _id: req.params.id})

    res.status(200).json({
        success: true
    })
})