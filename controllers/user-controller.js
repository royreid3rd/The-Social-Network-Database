const { User, Thought } = require('../models');

const userController = {
    // GET all users
    getAllUsers: async (req, res) => {
        try {
          const users = await User.find().populate('thoughts friends');
          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
      // GET a single user by its _id and populated thought and friend data
      getUserById: async (req, res) => {
        try {
          const user = await User.findById(req.params.id).populate('thoughts friends');
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
      // POST a new user
      createUser: async (req, res) => {
        try {
          const newUser = await User.create(req.body);
          res.status(201).json(newUser);
        } catch (err) {
          res.status(400).json(err);
        }
      },
    
      // PUT to update a user by its _id
      updateUser: async (req, res) => {
        try {
          const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json(updatedUser);
        } catch (err) {
          res.status(400).json(err);
        }
      },
    
      // DELETE to remove user by its _id
      deleteUser: async (req, res) => {
        try {
          const deletedUser = await User.findByIdAndDelete(req.params.id);
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
    
      // POST to add a new friend to a user's friend list
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
    
      // DELETE to remove a friend from a user's friend list
      deleteFriend: async (req, res) => {
        try {
          const user = await User.findById(req.params.userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.friends.pull(req.params.friendId);
          await user.save();
          res.json(user);
        } catch (err) {
          res.status(400).json(err);
        }
      }
    };


module.exports = userController;
