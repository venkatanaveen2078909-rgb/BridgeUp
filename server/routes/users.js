const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get current user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    const { bio, title, skills, interests, location } = req.body;

    // Build profile object
    const profileFields = {};
    if (bio) profileFields.bio = bio;
    if (title) profileFields.title = title;
    if (skills) profileFields.skills = skills; // Expecting array
    if (interests) profileFields.interests = interests; // Expecting array
    if (location) profileFields.location = location;

    try {
        let user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Matches (Users who teach what I want to learn)
router.get('/matches', auth, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const myInterests = currentUser.interests;

        if (!myInterests || myInterests.length === 0) {
            return res.json([]);
        }

        // Find users who have skills that match my interests
        // AND are not me
        const matches = await User.find({
            skills: { $in: myInterests },
            _id: { $ne: req.user.id }
        }).select('-password');

        res.json(matches);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
