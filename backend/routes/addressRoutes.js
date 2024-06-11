const { isAuthenticatedUser } = require('../middleware/auth')
const { createAddress, getAllAddresses, updateAddress, deleteAddress } = require('../controllers/addressController')
const express = require('express')
const router = express.Router()

router.route('/addresses').post(isAuthenticatedUser, createAddress)
router.route('/addresses').get(isAuthenticatedUser, getAllAddresses)
router.route('/addresses/:id').put(isAuthenticatedUser, updateAddress)
router.route('/addresses/:id').delete(isAuthenticatedUser, deleteAddress)

module.exports = router