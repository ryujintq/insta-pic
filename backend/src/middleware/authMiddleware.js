import ErrorResponse from '../utils/errorResponse.js'
import jwt from 'jsonwebtoken'
import { notAuthorized } from '../utils/errors.js'

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return next(notAuthorized())
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return next(notAuthorized())
        }

        const { id } = payload
        req.id = id

        next()
    })
}

export default authMiddleware
