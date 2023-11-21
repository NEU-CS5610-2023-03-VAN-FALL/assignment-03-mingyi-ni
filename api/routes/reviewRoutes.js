// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

// CRUD operations for reviews
router.post('/', ReviewController.createReview);
router.get('/', ReviewController.getReviews);
router.put('/:id', ReviewController.updateReview);
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;
