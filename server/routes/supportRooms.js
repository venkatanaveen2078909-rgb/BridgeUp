const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SupportRoom = require('../models/SupportRoom');

// Get all support rooms
router.get('/', auth, async (req, res) => {
    try {
        // Find all rooms, sort by activity (members count for now)
        const rooms = await SupportRoom.find().sort({ active: -1 });
        res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Join a support room (Mock implementation for now)
router.post('/join/:id', auth, async (req, res) => {
    try {
        const room = await SupportRoom.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ msg: 'Room not found' });
        }

        // In a real app, we would add the user ID to a members array
        // For now, we'll just increment the member count for simulation
        room.members += 1;
        await room.save();

        res.json({ msg: 'Joined room successfully', room });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Initialize default rooms (Helper for development)
router.post('/seed', async (req, res) => {
    try {
        const count = await SupportRoom.countDocuments();
        if (count > 0) return res.status(400).json({ msg: 'Rooms already seeded' });

        const rooms = [
            { name: 'Anxiety & Stress', members: 234, active: 12, description: 'A safe space to talk about daily anxieties and coping strategies', category: 'Anxiety' },
            { name: 'Career Burnout', members: 189, active: 8, description: 'Share experiences and support for work-related stress', category: 'Career' },
            { name: 'Loneliness Support', members: 312, active: 15, description: 'Connect with others who understand feeling isolated', category: 'Loneliness' },
            { name: 'Student Life', members: 456, active: 23, description: 'Support for students dealing with academic pressure', category: 'Student' }
        ];

        await SupportRoom.insertMany(rooms);
        res.json({ msg: 'Default rooms created' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
