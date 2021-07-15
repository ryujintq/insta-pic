import express from 'express'
import asyncHandler from '../middleware/asyncMiddleware.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import Following from '../models/followingModel.js'
import Follower from '../models/followerModel.js'
import multer from 'multer'
import uploadImage from '../utils/uploadImage.js'
import Like from '../models/likeModel.js'
import Comment from '../models/commentModel.js'

const router = express.Router()
const upload = multer()

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    let isFollowed

    const user = await User.findById(id).lean()

    const postsBeforeData = await Post.find({ user: id }).lean()

    const posts = []

    for (let i = 0, iEnd = postsBeforeData.length; i < iEnd; i++) {
        const likeCount = await Like.countDocuments({ post: postsBeforeData[i]._id })
        const commentCount = await Comment.countDocuments({ post: postsBeforeData[i]._id })
        posts.push({ ...postsBeforeData[i], likeCount, commentCount })
    }

    const followings = await Following.countDocuments({ user: id })

    const followers = await Follower.countDocuments({ user: id })

    const followCheck = await Following.findOne({ user: req.id, following: id })

    isFollowed = followCheck ? true : false

    posts.sort((postA, postB) => postB.createdAt - postA.createdAt)

    return res.status(200).json({ status: 'success', data: { user, posts, followings, followers, isFollowed } })
}))

router.get('/search/:searchTerm', asyncHandler(async (req, res) => {
    const searchTerm = req.params.searchTerm

    const users = await User.find({ username: { $regex: searchTerm, $options: 'i' } }, 'username profileImage firstName lastName')

    return res.status(200).json({ status: 'success', data: users })
}))

router.patch('/profileImage', upload.single('image'), uploadImage, asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.id, { profileImage: req.url }, { new: true })

    return res.status(200).json({ status: 'success', message: 'profile image updated', data: { user } })
}))

router.post('/follow', asyncHandler(async (req, res) => {
    const { followingId } = req.body

    const isFollowed = await Following.findOne({ user: req.id, following: followingId })

    if (isFollowed) {
        await Follower.findOneAndDelete({ user: followingId, follower: req.id })
        await isFollowed.delete()
        return res.status(200).json({ status: 'success', message: 'Follow was successful', data: { isFollowed: false } })
    }

    const following = new Following({
        user: req.id,
        following: followingId
    })

    const follower = new Follower({
        user: followingId,
        follower: req.id
    })

    Promise.all([await following.save(), await follower.save()])

    return res.status(200).json({ status: 'success', message: 'Follow was successful', data: { isFollowed: true } })

}))

export default router
