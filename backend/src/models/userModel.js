import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name']
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    profileImage: {
        type: String,
        default: 'https://storage.googleapis.com/instagram-clone-images/default-user.jpg'
    }
})

export default mongoose.model('User', userSchema)
