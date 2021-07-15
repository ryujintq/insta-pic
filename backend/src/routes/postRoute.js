import express from 'express'
import uploadImage from '../utils/uploadImage.js'
import multer from 'multer'
import Post from '../models/postModel.js'
import Following from '../models/followingModel.js'
import asyncHandler from '../middleware/asyncMiddleware.js'
import Comment from '../models/commentModel.js'
import Like from '../models/likeModel.js'

const router = express.Router()
const upload = multer()

const getPostData = async (post, userId) => {
    const comments = await Comment.find({ post: post._id }).sort({ createdAt: 'desc' }).populate('user', 'username').lean()
    const likeCount = await Like.countDocuments({ post: post._id })
    const isLiked = await Like.exists({ user: userId, post: post._id })
    return { ...post, comments, likeCount, isLiked }
}

router.get('/', asyncHandler(async (req, res) => {
    const followingsDocs = await Following.find({ user: req.id }).lean()

    //fetch all posts from following
    let posts = []
    for (let i = 0, iEnd = followingsDocs.length; i < iEnd; i++) {
        const followingPosts = await Post.find({ user: followingsDocs[i].following }).populate('user').lean()

        for (let j = 0, jEnd = followingPosts.length; j < jEnd; j++) {
            posts = posts.concat(await getPostData(followingPosts[j], req.id))
        }
    }

    posts.sort((postA, postB) => postB.createdAt - postA.createdAt)

    return res.status(200).json({ status: 'success', data: { posts } })
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id

    const post = await Post.findById(id).populate('user').lean()

    return res.status(200).json({ status: 'success', message: 'post found', data: { post: await getPostData(post, req.id) } })
}))

router.post('/', upload.single('image'), uploadImage, asyncHandler(async (req, res, next) => {
    const { caption, tags } = req.body

    //remove duplicate tags
    const tagsArray = tags.split(',')
    const tagsSet = new Set(tagsArray)

    //create post
    const post = new Post({
        user: req.id,
        caption,
        tags: [...tagsSet],
        imageURL: req.url,
    })

    //save post
    await post.save()

    //send post to user
    return res.status(200).json({ status: 'success', message: 'post was uploaded', data: { post } })
}))

router.post('/comment', asyncHandler(async (req, res) => {
    const { comment, postId } = req.body

    Comment.create({
        comment,
        post: postId,
        user: req.id
    })

    return res.status(200).json({ status: 'success', message: 'comment was posted' })
}))

router.post('/like', asyncHandler(async (req, res) => {
    const { postId } = req.body

    const isLiked = await Like.findOne({ user: req.id, post: postId })

    if (isLiked) {
        await isLiked.delete()
        return res.status(200).json({ status: 'success', message: 'Unlike was succesful', data: { isLiked: false } })
    }

    Like.create({
        post: postId,
        user: req.id
    })

    return res.status(200).json({ status: 'success', message: 'Like was succesful', data: { isLiked: true } })
}))

export default router
