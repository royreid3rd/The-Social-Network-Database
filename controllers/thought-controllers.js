const { Thought, reactionSchema } = require('../models');

const thoughtController = {
  // GET to get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET to get a single thought by its _id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a new thought
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      // Push the created thought's _id to the associated user's thoughts array field
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.thoughts.push(newThought._id);
      await user.save();
      res.status(201).json(newThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // PUT to update a thought by its _id
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE to remove a thought by its _id
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // POST to create a reaction stored in a single thought's reactions array field
  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
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

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions.pull({ reactionId: req.body.reactionId });
      await thought.save();
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = thoughtController;