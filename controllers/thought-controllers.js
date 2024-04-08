const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;

const thoughtController = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findById((req.params._id));
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createThought: async (req, res) => {
        try {
          const { thoughtText, username, userId } = req.body;
          const newThought = await Thought.create({ thoughtText, username, userId });
          
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.thoughts.push(newThought._id);
          await user.save();
    
          res.status(201).json(newThought);
        } catch (err) {
          res.status(400).json({ error: 'Bad Request' });
        }
      },

    updateThought: async (req, res) => {
        try {
            const updatedThought = await Thought.findByIdAndUpdate((req.params._id), req.body, { new: true });
            if (!updatedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteThought: async (req, res) => {
        try {
            const deletedThought = await Thought.findByIdAndDelete((req.params._id));
            if (!deletedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    addReaction: async (req, res) => {
        try {
            const thought = await Thought.findById((req.params.thoughtId));
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            thought.reactions.push(req.body);
            await thought.save();
            res.status(201).json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteReaction: async (req, res) => {
        try {
            const thought = await Thought.findById((req.params.thoughtId));
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            thought.reactions.pull({ reactionId: (req.body.reactionId) });
            await thought.save();
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

module.exports = thoughtController;
