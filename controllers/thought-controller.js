const { Thought } = require('../models');

const thoughtController = {
    
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // update thought by id
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // delete thought
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // create reaction
    createReaction({ params, body}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: {reactions: body }},
            { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // delete reaction
    deleteReaction({ params, body}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId}, 
            {$pull: {reactions: body }}, 
            {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!"});
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
};

module.exports = thoughtController;