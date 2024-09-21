const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the challenge schema
const challengeSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    expectedOutput: {
        type: mongoose.Schema.Types.Mixed,  // Allows flexibility for Object or Array
        required: true,
    },
    algorithmType: {
        type: String,
        required: true,
    },
    hints: [{
        type: String,
    }],
    testCases: [{
        input: mongoose.Schema.Types.Mixed,  // Can be an Object, Array, or other types
        expectedOutput: mongoose.Schema.Types.Mixed,
    }],
    codeBlocks: [{
        blockType: String,
        blockValue: mongoose.Schema.Types.Mixed,  // Can be any structure for drag and drop
    }],
    availableScales: [[String]],  // Array of array of notes (each note being a string)
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model from the schema
const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
