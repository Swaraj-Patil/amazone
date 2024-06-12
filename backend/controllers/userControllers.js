const Users = require('../models/userModel')
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    // const myCloud = await cloudinary.v2.uploader.upload('/default-profile.jpg', {
    //     folder: 'Amazone/Avatars',
    //     width: 150,
    //     crop: 'scale'
    // })

    const { name, email, password } = req.body
    const user = await Users.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'sample-id',
            url: '/default-profile.jpg'
        },
        // avatar: {
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url
        // },
        cover: {
            public_id: 'sample-id2',
            url: '/default-cover.png'
        }
    })

    sendToken(user, 201, res)
})

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    // Checking if user has given password & email both
    if (!email || !password) {
        return next(new ErrorHandler('Please enter your Email and Password.', 400))
    }

    const user = await Users.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password.', 401))
    }

    const isPasswordMatched = await user.comparePasswords(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password.', 401))
    }

    sendToken(user, 200, res)
})

// Logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out successfully.'
    })
})

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    // Get reset password token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you haven't requested this email, then please ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: `Amazone Password Recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Creating token hash
    const resetPasswordToken =
        crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest('hex')

    const user = await Users.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Reset password token is invalid or has been expired.', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password doesn\'t match.', 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)

})

// Get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await Users.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// Update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await Users.findById(req.user.id).select('+password')

    const isPasswordMatched = await user.comparePasswords(req.body.oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old Password is invalid.', 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler('New passwords doesn\'t match', 400))
    }

    user.password = req.body.newPassword
    await user.save()

    sendToken(user, 200, res)
})

// Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    
    let newUserData = {
        name: req.body.name,
        email: req.body.email,
        about: req.body.about
    }
    
    // Cloudinary
    if (req.body.avatar !== undefined) {
        const user = await Users.findById(req.user.id)
        const imageId = user.avatar.public_id

        if (imageId !== 'sample-id') {
            await cloudinary.v2.uploader.destroy(imageId)
        }
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'Amazone/Avatars',
            // width: 150,
            crop: 'scale'
        })

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    } 
    else {
        const user = await Users.findById(req.user.id)
        newUserData.avatar = {
            public_id: user.avatar.public_id,
            url: user.avatar.url
        }
    }

    if (req.body.cover !== undefined) {
        const user2 = await Users.findById(req.user.id)
        const imageId2 = user2.cover.public_id

        if (imageId2 !== 'sample-id2') {
            await cloudinary.v2.uploader.destroy(imageId2)
        }

        const myCloud2 = await cloudinary.v2.uploader.upload(req.body.cover, {
            folder: 'Amazone/Covers',
            // width: 150,
            crop: 'scale'
        })

        newUserData.cover = {
            public_id: myCloud2.public_id,
            url: myCloud2.secure_url
        }
    }
    else {
        const user2 = await Users.findById(req.user.id)
        newUserData.cover = {
            public_id: user2.cover.public_id,
            url: user2.cover.url
        }
    }
    
    await Users.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        // message: 'Profile updated successfully.'
    })
})

// Get all users --> Admin
exports.getAllUsers = catchAsyncErrors( async (req, res, next) => {
    const users = await Users.find()

    res.status(200).json({
        success: true,
        users
    })
})

// Get user details --> Admin
exports.getSingleUser = catchAsyncErrors( async (req, res, next) => {
    const user = await Users.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User not found with ID: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update role of user --> Admin
exports.updateRole = catchAsyncErrors( async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await Users.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if(!user) {
        return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        message: 'User role updated successfully.'
    })
})

// Delete a user --> Admin
exports.deleteUser = catchAsyncErrors( async (req, res, next) => {
    const user = await Users.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 400))
    }

    // Avatar from cloudinary should be deleted

    await Users.deleteOne({ _id: req.params.id })

    res.status(200).json({
        success: true,
        message: 'User Deleted successfully.'
    })
})
