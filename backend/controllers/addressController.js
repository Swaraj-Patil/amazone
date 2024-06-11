const Addresses = require('../models/adressModel')
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// Create a new Address --> User
exports.createAddress = catchAsyncErrors( async (req, res, next) => {
    req.body.user = req.user.id
    
    const address = await Addresses.create(req.body)

    res.status(200)
        .json({
            success: true,
            address
        })
})

// Get all addresses --> User
exports.getAllAddresses = catchAsyncErrors( async (req, res, next) => {

    const addresses = await Addresses.find({ user: req.user._id})

    res.status(200)
        .json({
            success: true,
            addresses
        })
})

// Update an address --> User
exports.updateAddress = catchAsyncErrors( async (req, res, next) => {
    let address = await Addresses.findById(req.params.id)

    if (!address) {
        return next(new ErrorHandler('Address not found', 404))
    }

    address = await Addresses.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200)
        .json({
            success: true,
            address
        })
})

// Delete an address --> User
exports.deleteAddress = catchAsyncErrors( async (req, res, next) => {
    const address = await Addresses.findById(req.params.id)

    if (!address) {
        return next(new ErrorHandler('Address not found', 404))
    }

    await Addresses.deleteOne({ _id: req.params.id })

    res.status(200)
        .json({
            success: true,
            message: 'Address deleted successfully.'
        })
})
