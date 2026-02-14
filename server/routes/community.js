const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Neighbor = require('../models/Neighbor');
const TinyFavor = require('../models/TinyFavor');
const CommunityEvent = require('../models/CommunityEvent');

// Get all data for Community Mode
router.get('/dashboard', auth, async (req, res) => {
    try {
        const neighbors = await Neighbor.find();
        const tinyFavors = await TinyFavor.find().sort({ when: 1 });
        const events = await CommunityEvent.find().sort({ date: 1 });

        res.json({
            neighbors,
            tinyFavors,
            events
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Seed default data
router.post('/seed', async (req, res) => {
    try {
        const neighborsCount = await Neighbor.countDocuments();
        if (neighborsCount === 0) {
            await Neighbor.insertMany([
                { name: 'Mary Johnson', initials: 'MJ', distance: '0.3 mi', skills: ['Gardening', 'Cooking', 'Pet Care'], needs: ['Tech Help', 'Moving Help'], misScore: 342, helped: 45, available: true },
                { name: 'Tom Williams', initials: 'TW', distance: '0.5 mi', skills: ['Plumbing', 'Carpentry', 'Home Repair'], needs: ['Language Practice', 'Resume Help'], misScore: 298, helped: 32, available: true },
                { name: 'Lisa Chen', initials: 'LC', distance: '0.7 mi', skills: ['Math Tutoring', 'Music Lessons'], needs: ['Garden Help'], misScore: 276, helped: 28, available: false },
                { name: 'Robert Davis', initials: 'RD', distance: '0.4 mi', skills: ['Electrical Work', 'Tech Support'], needs: ['Meal Prep'], misScore: 312, helped: 38, available: true }
            ]);
        }

        const favorsCount = await TinyFavor.countDocuments();
        if (favorsCount === 0) {
            await TinyFavor.insertMany([
                { requester: 'Sarah M.', initials: 'SM', favor: 'Need help carrying groceries', time: '15 min', points: '+5', distance: '0.2 mi', when: 'Today, 5:00 PM' },
                { requester: 'John K.', initials: 'JK', favor: 'Can someone water my plants?', time: '10 min', points: '+4', distance: '0.4 mi', when: 'Tomorrow' },
                { requester: 'Emma W.', initials: 'EW', favor: 'Need a ride to grocery store', time: '30 min', points: '+8', distance: '0.6 mi', when: 'This Weekend' }
            ]);
        }

        const eventsCount = await CommunityEvent.countDocuments();
        if (eventsCount === 0) {
            await CommunityEvent.insertMany([
                { title: 'Community Garden Day', date: 'Saturday, Feb 20', time: '10:00 AM - 2:00 PM', location: 'Central Park', attendees: 24, category: 'Outdoors', organizer: 'Mary Johnson' },
                { title: 'Tech Help Session', date: 'Sunday, Feb 21', time: '2:00 PM - 4:00 PM', location: 'Community Center', attendees: 15, category: 'Learning', organizer: 'Tom Williams' },
                { title: 'Neighborhood Potluck', date: 'Friday, Feb 26', time: '6:00 PM - 9:00 PM', location: 'Maple Street Park', attendees: 42, category: 'Social', organizer: 'Lisa Chen' }
            ]);
        }

        res.json({ msg: 'Community mode data seeded' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
