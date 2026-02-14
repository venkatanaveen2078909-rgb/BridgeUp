const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    with: {
        type: String,
        required: true
    },
    date: {
        type: String, // Keep as string for now for simplicity in display
        required: true
    },
    duration: {
        type: String,
        default: '30 min'
    },
    type: {
        type: String,
        enum: ['Teaching', 'Learning', 'Collaboration'],
        default: 'Learning'
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    }
});

module.exports = mongoose.model('Session', SessionSchema);
