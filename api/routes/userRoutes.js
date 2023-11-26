// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// CRUD operations for users
router.get('/', UserController.getUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
