const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')

// Handling Uncaught exception
process.on('uncaughtException', error => {
    console.log(`Error: ${error.message}`)
    console.log('Shutting down the server due to uncaught exception')

    process.exit(1)
})

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: 'backend/config/config.env' })
}

// Connecting to database
connectDatabase()

// Cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

// Unhandled promise rejection
process.on('unhandledRejection', error => {
    console.log(`Error: ${error.message}`)
    console.log('Shutting down the server due to unhandled promise rejection.')

    server.close(() => {
        process.exit(1)
    })


})