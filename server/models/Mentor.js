const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    initials: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        default: '5+ years'
    },
    mentees: {
        type: Number,
        default: 0
    },
    misScore: {
        type: Number,
        default: 100
    },
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Mentor', MentorSchema);
