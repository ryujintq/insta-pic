import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Like', likeSchema)
