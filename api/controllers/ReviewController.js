// controllers/ReviewController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new review
const createReview = async (req, res) => {
    try {
        const { content, userId, movieId } = req.body;

        // Check if the associated user and movie exist
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!user || !movie) {
            return res.status(404).json({ error: 'User or Movie not found' });
        }

        const review = await prisma.review.create({
            data: {
                content,
                userId,
                movieId,
            },
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await prisma.review.findMany();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a review by ID
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const updatedReview = await prisma.review.update({
            where: { id: parseInt(id) },
            data: { content },
        });

        res.status(200).json(updatedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.review.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
};
