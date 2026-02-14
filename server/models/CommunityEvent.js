const mongoose = require('mongoose');

const CommunityEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    attendees: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ['Social', 'Learning', 'Outdoors', 'Volunteering'],
        default: 'Social'
    },
    organizer: {
        type: String,
        default: 'Community Member'
    }
});

module.exports = mongoose.model('CommunityEvent', CommunityEventSchema);
