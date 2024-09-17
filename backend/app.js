const express = require('express')
const ErrorHandler = require('./utils/ErrorHandler')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))

if(process.env.NODE_ENV != "PRODUCTION") {
    require('dotenv').config({
        path: 'backend/config/.env'
    })
}

//Import routes 
const user = require('./controllers/user')

app.use('api/v2/user', user)

//Error handling section
app.use(ErrorHandler)

module.exports = app