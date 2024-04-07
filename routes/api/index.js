const router = require('express').Router();
const userController = require('./controllers/user-controller');
const thoughtController = require('./controllers/thought-controller');

// Routes for /api/users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users/:userId/friends/:friendId', userController.addFriend);
router.delete('/users/:userId/friends/:friendId', userController.deleteFriend);

// Routes for /api/thoughts
router.get('/thoughts', thoughtController.getAllThoughts);
router.get('/thoughts/:id', thoughtController.getThoughtById);
router.post('/thoughts', thoughtController.createThought);
router.put('/thoughts/:id', thoughtController.updateThought);
router.delete('/thoughts/:id', thoughtController.deleteThought);
router.post('/thoughts/:thoughtId/reactions', thoughtController.addReaction);
router.delete('/thoughts/:thoughtId/reactions', thoughtController.deleteReaction);

module.exports = router;