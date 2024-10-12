const express = require('express')
const path = require('path')
const User = require('../models/user')
const { upload } = require('../multer')
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const router = express.Router()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const sendToken = require('../utils/jwtToken')
const { isAuthenticated } = require('../middlewares/auth')

router.post('/create-user', upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const userEmail = await User.findOne({ email })

        if (userEmail) {
            const fileName = req.file.filename
            const filePath = `uploads/${fileName}`
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: 'Error deleting file' })
                }
            })
            return next(new ErrorHandler('User already exists', 400))
        }

        const fileName = req.file.filename
        const fileUrl = path.join(fileName)

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl
        }

        const activationToken = createActivationToken(user)

        const activationUrl = `http://localhost:3000/activation/${activationToken}`

        try {
            await sendMail({
                email: user.email,
                subject: 'Activate your account',
                message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`
            })
            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account`
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }
    } catch (error) {
        if (req.file && req.file.filename) {
            // In case of error, delete the uploaded file
            const filePath = `uploads/${req.file.filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }
        return next(new ErrorHandler(error.message, 400))
    }
})

//Activation token function
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: '5m'
    })
}

//Activate user
router.post('/activation', catchAsyncErrors(async (req, res, next) => {
    try {
        const { activationToken } = req.body;

        if (!activationToken) {
            return next(new ErrorHandler('No activation token', 400));
        }

        const newUser = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

        if (!newUser) {
            return next(new ErrorHandler('Invalid or expired token', 400));
        }

        const { name, email, password, avatar } = newUser;

        const matchedUser = await User.findOne({ email });

        if (matchedUser) {
            return next(new ErrorHandler('User already exists', 400));
        }

        // Await the User.create operation to ensure it completes before proceeding
        const createdUser = await User.create({
            name,
            email,
            avatar,
            password
        });

        sendToken(createdUser, 201, res);

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

//Login user
router.post('/login-user', catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new ErrorHandler('Please provide the necessary information', 400))
        }

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return next(new ErrorHandler('User doesnot exists', 500))
        }

        const isPasswordValid = await user.comparePassword(password)

        if (!isPasswordValid) {
            return next(new ErrorHandler('Please provide the correct information', 400))
        }

        sendToken(user, 201, res)

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

//Load user
router.get('/get-user', isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return next(new ErrorHandler('User doesnot exists', 500))
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))


module.exports = router