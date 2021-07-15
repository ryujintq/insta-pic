import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timeStamp: true
})

export default mongoose.model('Comment', commentSchema)
