const { User, Thought } = require('../models');
const { Types: { ObjectId } } = require('mongoose');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById((req.params._id)).populate('thoughts friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

updateUser: async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
    }
},

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete((req.params._id));
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Remove user's associated thoughts (bonus)
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends.push(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteFriend: async (req, res) => {
    try {
      const user = await User.findById((req.params.userId));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends.pull((req.params.friendId));
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = userController;
