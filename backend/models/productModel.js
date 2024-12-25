const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name for this product.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter some description for this product.'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price for this product.'],
        maxLength: [8, 'Price cannot exceed 8 characters.'],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: 'String',
        required: [true, 'Please select a category for this product.'],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter the stock available for this product.'],
        maxLength: [4, 'Stock cannot exceed 4 characters.'],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            profile: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            },
            verified: {
                type: Boolean,
                required: false,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    brand: {
        type: String,
        required: [true, 'Please enter the brand of this product.'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Products', productSchema)