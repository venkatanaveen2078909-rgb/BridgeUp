const mongoose = require('mongoose');

const TinyFavorSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true
    },
    initials: {
        type: String,
        required: true
    },
    favor: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: '15 min'
    },
    points: {
        type: String,
        default: '+5'
    },
    distance: {
        type: String,
        default: 'Nearby'
    },
    when: {
        type: String,
        default: 'Today'
    },
    status: {
        type: String,
        enum: ['Open', 'Completed'],
        default: 'Open'
    }
});

module.exports = mongoose.model('TinyFavor', TinyFavorSchema);
