// index.js
import { auth } from  'express-oauth2-jwt-bearer'

const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes'); // Replace with your actual routes
const reviewRoutes = require('./routes/reviewRoutes'); // Replace with your actual routes
const userRoutes = require('./routes/userRoutes'); // Replace with your actual routes

const requireAuth = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: 'RS256'
});

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});
app.post("/verify-user", requireAuth, async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

    const user = await prisma.user.findUnique({
        where: {
            auth0Id,
        },
    });

    if (user) {
        res.json(user);
    } else {
        const newUser = await prisma.user.create({
            data: {
                email,
                auth0Id,
                name,
            },
        });

        res.json(newUser);
    }
});

// Routes
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
