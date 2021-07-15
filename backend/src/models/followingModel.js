import mongoose from 'mongoose'

const followingSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    following: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Following', followingSchema)
