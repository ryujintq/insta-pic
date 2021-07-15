import express from 'express'
import asyncHandler from '../middleware/asyncMiddleware.js'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import matchPasswords from '../utils/matchPasswords.js'
import { invalidCredentials } from '../utils/errors.js'
import genToken from '../utils/genToken.js'

const router = express.Router()

router.post('/signup', asyncHandler(async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body

    const user = new User({
        firstName,
        lastName,
        username,
        email,
        password: password ? await bcrypt.hash(password, 10) : null
    })

    await user.save()

    user.password = ''

    return res.status(200).json({
        status: 'success',
        message: 'signup was successful',
        data: { token: await genToken(user._id), user }
    })
}))

router.post('/login', asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).lean()

    if (user && await matchPasswords(password, user.password)) {
        user.password = ''
        return res.status(200).json({
            status: 'success',
            message: 'login was successful',
            data: { token: await genToken(user._id), user }
        })
    }

    next(invalidCredentials())
}))

export default router
