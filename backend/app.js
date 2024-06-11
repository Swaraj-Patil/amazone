const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const errorMiddleware = require('./middleware/error')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

// Route Imports
const products = require('./routes/productRoutes')
const users = require('./routes/userRoutes')
const orders = require('./routes/orderRoutes')
const addresses = require('./routes/addressRoutes')

app.use('/api/v1', products)
app.use('/api/v1', users)
app.use('/api/v1', orders)
app.use('/api/v1', addresses)

// Middleware for errors
app.use(errorMiddleware)

module.exports = app