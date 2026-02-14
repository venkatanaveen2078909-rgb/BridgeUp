const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    referredBy: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Application Submitted', 'Interview Scheduled', 'Offer Received', 'Rejected'],
        default: 'Application Submitted'
    },
    date: {
        type: String,
        default: 'Just now'
    }
});

module.exports = mongoose.model('Referral', ReferralSchema);
