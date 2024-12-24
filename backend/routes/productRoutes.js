const express = require('express')
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createReview,
    getAllReviews,
    deleteReview
} = require('../controllers/productControllers')
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth')

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getProductDetails)

router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRoles('Admin'), createProduct)
router
    .route('/admin/product/:id')
    // .get(isAuthenticatedUser, authorizedRoles('Admin'), getProductDetails)
    .put(isAuthenticatedUser, authorizedRoles('Admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles('Admin'), deleteProduct)

router
    .route('/review')
    .put(isAuthenticatedUser, createReview)

router
    .route('/reviews')
    .get(getAllReviews)
    .delete(isAuthenticatedUser, deleteReview)

module.exports = router
