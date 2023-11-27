
// controllers/ReviewController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getReviewsByMovie = async (req, res) => {
    try {
        console.log(req.params);
        const { movieId } = req.params;

        // Get reviews for the specified movie
        const reviews = await prisma.review.findMany({
            where: { movieId: parseInt(movieId) },
            include: {
                user: true, // Include the associated user information
                movie: true,
            },
        });

        if (!reviews) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getReviewsByUser = async (req, res) => {
    try {
        console.log(req.params);
        const { userId } = req.params;

        // Get reviews for the specified movie
        const reviews = await prisma.review.findMany({
            where: { userId: parseInt(userId) },
        });

        if (!reviews) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new review
const createReview = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    try {
        const { content, movieId } = req.body;

        // Check if the associated user and movie exist
        const user = await prisma.user.findUnique({
            where: { auth0Id },
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
                user: {
                    connect: { auth0Id }
                },
                movie: {
                    connect: { id: movieId }
                }
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
    const auth0Id = req.auth.payload.sub;

    // console.log(req.auth)

    const user = await prisma.user.findUnique({
        where: {
            auth0Id,
        },
    });

    const reviews = await prisma.review.findMany({
        where: {
            userId: user.id,
        },
        include: {
            user: true, // Include the associated user information
            movie: true,
        },
    });

    res.json(reviews);
};

// Update a review by ID
const updateReview = async (req, res) => {
    const auth0Id = req.auth.payload.sub;

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
    getReviewsByMovie,
    getReviewsByUser,
};
