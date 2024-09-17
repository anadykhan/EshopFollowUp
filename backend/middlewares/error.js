const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal server error'

    //Wrong MongoDB id
    if (err.name === 'CastError') {
        const message = `Rosources is not found with this id. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    //Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400)
    }

    //Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = `Your url is invalid please try again later`
        err = new ErrorHandler(message, 400)
    }

    //JWT expired
    if (err.name === 'TokenExpiredError') {
        const message = `Your URL is expired please try again later`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}

