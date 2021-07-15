import mongoose from 'mongoose'

const notificationsSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export default mongoose.model('Notification', notificationsSchema)
