const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    availability: {
        type: Boolean
    }
})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;