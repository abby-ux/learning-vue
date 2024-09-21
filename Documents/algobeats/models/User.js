const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the user schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    completedChallenges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
    }],
    savedCompositions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Composition',
    }],
    preferences: {
        theme: {
            type: String,
            default: 'light',
        },
        notification: {
            type: Boolean,
            default: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
