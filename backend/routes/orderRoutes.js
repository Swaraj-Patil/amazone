const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth')
const {
    newOrder, 
    getSingleOrder, 
    getMyOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController')


router.route('/order/new').post(isAuthenticatedUser, newOrder)

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)

router.route('/orders/me').get(isAuthenticatedUser, getMyOrders)

router.route('/admin/orders').get(isAuthenticatedUser, authorizedRoles('Admin'), getAllOrders)

router
    .route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizedRoles('Admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizedRoles('Admin'), deleteOrder)

module.exports = router