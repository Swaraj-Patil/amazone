const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const errorMiddleware = require('./middleware/error')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')

// Route Imports
const products = require('./routes/productRoutes')
const users = require('./routes/userRoutes')
const orders = require('./routes/orderRoutes')
const addresses = require('./routes/addressRoutes')

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: 'backend/config/config.env' })
}

app.use(cors())
app.use(express.json({
    limit: '50mb'
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

app.use('/api/v1', products)
app.use('/api/v1', users)
app.use('/api/v1', orders)
app.use('/api/v1', addresses)

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
})

// Middleware for errors
app.use(errorMiddleware)

module.exports = app