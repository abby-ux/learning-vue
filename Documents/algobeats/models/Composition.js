// field	type	description
// id	UIUD	
// title	String	named by user
// userID	UIUD	refrence to user who created the composition
// challengeID	UIUD	Reference to the challenge the composition is associated with
// compositionData	Object	Contains the structure of the composition - notes, rhythms, scale, tempo
// algorithmUsed	String	
// createdAt	Date	

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the composition schema
const compositionSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
        default: uuidv4,
    },
    challengeID: {
        type: String,
        required: true,
        default: uuidv4,
    },
    compositionData: {
        type: Object,
        required: true,
    },
    algorithmUsed: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model from the schema
const Composition = mongoose.model('Composition', compositionSchema);

module.exports = Composition;
