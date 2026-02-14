const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Additional fields for Bondly platform
    misScore: { type: Number, default: 0 },
    level: { type: String, default: 'Newcomer' },
    streak: { type: Number, default: 0 },
    location: { type: String, default: 'Your City' },
    bio: { type: String, default: '' },
    title: { type: String, default: '' },
    skills: { type: [String], default: [] },
    interests: { type: [String], default: [] },
});

module.exports = mongoose.model('User', UserSchema);
