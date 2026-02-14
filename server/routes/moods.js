const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // We need to create this middleware
const Mood = require('../models/Mood');

// Add a mood entry
router.post('/', auth, async (req, res) => {
    try {
        const { mood, note } = req.body;

        const newMood = new Mood({
            user: req.user.id,
            mood,
            note
        });

        const savedMood = await newMood.save();
        res.json(savedMood);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get user's mood history
router.get('/', auth, async (req, res) => {
    try {
        const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });
        res.json(moods);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
