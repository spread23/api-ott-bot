const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    talents: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    cv: {
        type: String,
        default: 'cv.pdf'
    },
    video: {
        type: String,
        default: 'video.mp4'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

})

module.exports = model('User', UserSchema, 'users')