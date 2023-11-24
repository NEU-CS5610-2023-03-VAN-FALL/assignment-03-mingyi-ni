// index.js

const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes'); // Replace with your actual routes
const reviewRoutes = require('./routes/reviewRoutes'); // Replace with your actual routes
const userRoutes = require('./routes/userRoutes'); // Replace with your actual routes

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

// Routes
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
