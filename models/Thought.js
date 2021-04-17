const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');



const ThoughtSchema = new Schema(
    {
        thoughText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce(
        (total, reaction) => total + reaction.length + 1, 0
    );
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;