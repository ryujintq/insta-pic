import mongoose from 'mongoose'

const followerSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    follower: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Follower', followerSchema)
