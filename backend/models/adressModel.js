const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter a name.'],
        maxLength: [30, 'Name cannot exceed 30 characters.'],
        minLength: [3, 'Name should be atleast 3 characters long.']
    },
    mobile: {
        type: String,
        required: [true, 'Please enter a phone number so we can call if there are any issues with delivery.'],
        length: [10, 'Invalid number.'],
    },
    pincode: {
        type: Number,
        required: [true, 'Please enter a ZIP or postal code.'],
        length: [6, 'Invalid pincode.'],
    },
    addressLine: {
        type: String,
        required: [true, 'Please enter an address.']
    },
    area: {
        type: String,
        required: false
    },
    landmark: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: [true, 'Please enter a city name.']
    },
    state: {
        type: String,
        required: [true, 'Please enter a state, region or province.']
    },
    country: {
        type: String,
        required: [true, 'Please enter a country.'],
        default: 'India'
    },
    defaultAddress: {
        type: Boolean,
        required: false,
        default: false
    },
    deliveryInstructions: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
})

module.exports = mongoose.model('Addresses', addressSchema)