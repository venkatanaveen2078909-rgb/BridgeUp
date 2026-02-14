const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Deep Connection', 'Gratitude', 'Self-Reflection', 'Dreams', 'Fun']
    },
    question: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'from-blue-500 to-cyan-500' // Tailwind gradient classes
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Prompt', PromptSchema);
