import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    caption: String,
    tags: [String],
    imageURL: String
}, {
    timestamps: true
})

export default mongoose.model('Post', postSchema)
