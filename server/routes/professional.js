const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Session = require('../models/Session');
const Referral = require('../models/Referral');
const Mentor = require('../models/Mentor');

// Get all data for Professional Mode
router.get('/dashboard', auth, async (req, res) => {
    try {
        const sessions = await Session.find().sort({ date: 1 });
        const referrals = await Referral.find().sort({ date: -1 });
        const mentors = await Mentor.find();

        res.json({
            sessions,
            referrals,
            mentors
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Seed default data
router.post('/seed', async (req, res) => {
    try {
        // Clear existing data to avoid duplicates on multiple seeds
        // await Session.deleteMany({});
        // await Referral.deleteMany({});
        // await Mentor.deleteMany({});

        const sessionsCount = await Session.countDocuments();
        if (sessionsCount === 0) {
            await Session.insertMany([
                { topic: 'React Hooks Deep Dive', with: 'Sarah Chen', date: 'Tomorrow, 2:00 PM', duration: '30 min', type: 'Teaching' },
                { topic: 'Introduction to Python', with: 'Mike Rodriguez', date: 'Friday, 4:00 PM', duration: '30 min', type: 'Learning' }
            ]);
        }

        const referralsCount = await Referral.countDocuments();
        if (referralsCount === 0) {
            await Referral.insertMany([
                { company: 'TechCorp Inc.', position: 'Frontend Developer', referredBy: 'Sarah Chen', status: 'Interview Scheduled', date: 'Next Week' },
                { company: 'DataFlow Solutions', position: 'Junior Data Analyst', referredBy: 'Mike Rodriguez', status: 'Application Submitted', date: '2 days ago' }
            ]);
        }

        const mentorsCount = await Mentor.countDocuments();
        if (mentorsCount === 0) {
            await Mentor.insertMany([
                { name: 'Dr. Lisa Wang', initials: 'LW', expertise: 'AI & Machine Learning', experience: '15 years', mentees: 23, misScore: 456, available: true },
                { name: 'Alex Martinez', initials: 'AM', expertise: 'Product Management', experience: '10 years', mentees: 18, misScore: 398, available: true }
            ]);
        }

        res.json({ msg: 'Professional mode data seeded' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
