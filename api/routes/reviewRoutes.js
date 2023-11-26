const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const {auth} = require("express-oauth2-jwt-bearer");

const requireAuth = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: 'RS256'
});

// CRUD operations for reviews
router.post('/', requireAuth, ReviewController.createReview);
router.get('/', requireAuth, ReviewController.getReviews);
router.get('/movie/:movieId', ReviewController.getReviewsByMovie); // New route
router.get('/user/:userId', ReviewController.getReviewsByUser);
router.put('/:id', requireAuth, ReviewController.updateReview);
router.delete('/:id', requireAuth, ReviewController.deleteReview);

module.exports = router;
