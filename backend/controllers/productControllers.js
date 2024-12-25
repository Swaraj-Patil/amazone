const Products = require('../models/productModel')
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')
const cloudinary = require('cloudinary')

// Create a new Product --> Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = []

    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    const imagesLink = []
    for (let i = 0; i < images?.length; i++) {
        try {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            })
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    req.body.images = imagesLink
    req.body.user = req.user.id

    const product = await Products.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 8
    const productsCount = await Products.countDocuments()

    const apiFeature =
        new ApiFeatures(Products.find(), req.query)
            .search()
            .filter()

    const filteredProducts = await apiFeature.query

    let filteredProductsCount = filteredProducts.length

    const apiFeature2 =
        new ApiFeatures(Products.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage)

    const products = await apiFeature2.query

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    })
})

// Get details of a product
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Products.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update a product --> Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Products.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

// Delete a product --> Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Products.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    await Products.deleteOne({ _id: req.params.id })

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully.'
    })
})

// Create a new Review or Update existing review
exports.createReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, title, comment, productId, profileID, profileURL } = req.body
    const profile = {
        public_id: profileID,
        url: profileURL
    }
    console.log('profile', profile)
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        title,
        comment,
        profile
    }

    const product = await Products.findById(productId)

    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.rating = rating,
                    review.title = title,
                    review.comment = comment,
                    review.profile = profile
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let totalRating = 0
    product.reviews.forEach(review => {
        totalRating += review.rating
    })
    product.ratings = totalRating / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

// Get all reviews of a product
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Products.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler(`Product not found`, 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Products.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler(`Product not found`, 404))
    }

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    let totalRating = 0
    reviews.forEach(review => {
        totalRating += review.rating
    })

    let ratings = 0

    if (reviews.length === 0) {
        ratings = 0
    } else {
        ratings = totalRatings / reviews.length
    }
    const numOfReviews = reviews.length

    await Products.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        // message: 'Review deleted sucessfully'
    })
})