import ErrorResponse from "../utils/errorResponse.js"

const errorHandler = (err, req, res, next) => {
    if (err.code === 11000) {
        const message = 'User already exists'
        err = new ErrorResponse(message, 400)
    }

    res.status(err.statusCode || 500).json({ error: err.message || 'Server Error' })
}

export default errorHandler
