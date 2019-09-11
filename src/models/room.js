const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    schedule: {
        type: Date,
        required: true
    }
})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;