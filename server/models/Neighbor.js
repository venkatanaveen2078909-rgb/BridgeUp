const mongoose = require('mongoose');

const NeighborSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    initials: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        default: 'Nearby'
    },
    skills: {
        type: [String],
        default: []
    },
    needs: {
        type: [String],
        default: []
    },
    misScore: {
        type: Number,
        default: 100
    },
    helped: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Neighbor', NeighborSchema);
