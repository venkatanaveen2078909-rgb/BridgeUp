const mongoose = require('mongoose');

const SupportRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    members: {
        type: Number,
        default: 0
    },
    active: {
        type: Number,
        default: 0
    },
    isPrivate: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['Anxiety', 'Career', 'Loneliness', 'Student', 'General'],
        default: 'General'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SupportRoom', SupportRoomSchema);
