const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name.'],
        maxLength: [30, 'Name cannot exceed 30 characters.'],
        minLength: [3, 'Name should be atleast 3 characters long.']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.'],
        minLength: [8, 'Password should have atleast 8 characters.'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    cover: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    about: {
        type: String,
        required: true,
        maxLength: [400, '\'About\' cannot exceed 400 characters.'],
        default: 'I\'m not a shopaholic... I\'m helping the economy.'
    },
    role: {
        type: String,
        default: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre('save', async function(next) {
    
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT Token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare Passwords
userSchema.methods.comparePasswords = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generating password reset token
userSchema.methods.getResetPasswordToken = function() {

    // Generating token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hashing and add to userSchema
    this.resetPasswordToken = 
        crypto
            .createHash("sha256")
            .update(resetToken)
            .digest('hex')

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('Users', userSchema)