// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {auth} = require("express-oauth2-jwt-bearer");

const requireAuth = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: 'RS256'
});

// CRUD operations for users
router.get('/', requireAuth, UserController.getUsers);
router.put('/', requireAuth, UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
