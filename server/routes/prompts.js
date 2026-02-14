const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Prompt = require('../models/Prompt');

// Get all discussion prompts
router.get('/', auth, async (req, res) => {
    try {
        const prompts = await Prompt.find();
        res.json(prompts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Initialize default prompts (Helper for development)
router.post('/seed', async (req, res) => {
    try {
        const count = await Prompt.countDocuments();
        if (count > 0) return res.status(400).json({ msg: 'Prompts already seeded' });

        const prompts = [
            { category: 'Deep Connection', question: 'What moment in your life made you who you are today?', color: 'from-purple-500 to-pink-500' },
            { category: 'Gratitude', question: 'What are three things you\'re grateful for right now?', color: 'from-blue-500 to-cyan-500' },
            { category: 'Self-Reflection', question: 'What would you tell your younger self if you could?', color: 'from-green-500 to-emerald-500' },
            { category: 'Dreams', question: 'If fear wasn\'t a factor, what would you pursue?', color: 'from-amber-500 to-orange-500' }
        ];

        await Prompt.insertMany(prompts);
        res.json({ msg: 'Default prompts created' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
