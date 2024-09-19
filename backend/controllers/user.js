const express = require('express')
const path = require('path')
const User = require('../models/user')
const { upload } = require('../multer')
const ErrorHandler = require('../utils/ErrorHandler')
const router = express.Router()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')

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
                else {
                    res.json({ message: 'File deleted' })
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


module.exports = router