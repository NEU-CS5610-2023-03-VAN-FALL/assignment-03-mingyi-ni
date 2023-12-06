// controllers/MovieController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new movie
const createMovie = async (req, res) => {
    try {
        const { title, imdbId, /* other movie attributes */ } = req.body;

        // Check if the movie with the same IMDb ID already exists
        const existingMovie = await prisma.movie.findUnique({
            where: { imdbId },
        });

        if (existingMovie) {
            // If the movie exists, update its attributes
            const updatedMovie = await prisma.movie.update({
                where: { imdbId },
                data: { title, /* update other attributes */ },
            });

            res.status(200).json(updatedMovie);
        } else {
            console.log(title);
            // If the movie doesn't exist, create a new one
            const newMovie = await prisma.movie.create({
                data: { title, imdbId, /* other movie attributes */ },
            });

            res.status(201).json(newMovie);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
};



// Get all movies
const getMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany();
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a specific movie by ID
const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Request for Movie ID:', id);

        const movie = await prisma.movie.findUnique({
            where: { imdbId: id },
        });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update a movie by ID
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const updatedMovie = await prisma.movie.update({
            where: { id: parseInt(id) },
            data: { title },
        });

        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a movie by ID
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.movie.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
};
