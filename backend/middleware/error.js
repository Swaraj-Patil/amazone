const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    // Handling wrong MongoDB collection ID error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400)

    }

    // Wrong JWT Token error
    if (err.name === 'JsonWebTokenError') {
        const message = `JSON Web Token is invalid. Please try again.`
        err = new ErrorHandler(message, 400)
    }

    // JWT Expire error
    if (err.name === 'TokenExpiredError') {
        const message = `JSON Web Token is expired. Please try again.`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}