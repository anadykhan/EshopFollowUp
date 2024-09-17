const express = require('express')
const path = require('path')
const User = require('../models/user')
const { upload } = require('../multer')
const ErrorHandler = require('../utils/ErrorHandler')
const router = express.Router()

router.post('/create-user', upload.single('file'), async (req, res, next) => {
    const {name, email, password} = req.body

    const userEmail = await User.findOne({email})

    if(userEmail){
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

    console.log(user)

})