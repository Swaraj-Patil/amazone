const express = require('express')
const {
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserDetails, 
    updatePassword, 
    updateProfile, 
    getAllUsers, 
    getSingleUser, 
    deleteUser, 
    updateRole
} = require('../controllers/userControllers')
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/me').get(isAuthenticatedUser, getUserDetails)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)

router.route('/admin/users').get(isAuthenticatedUser, authorizedRoles('Admin'), getAllUsers)
router
    .route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizedRoles('Admin'), getSingleUser)
    .put(isAuthenticatedUser, authorizedRoles('Admin'), updateRole)
    .delete(isAuthenticatedUser, authorizedRoles('Admin'), deleteUser)

module.exports = router