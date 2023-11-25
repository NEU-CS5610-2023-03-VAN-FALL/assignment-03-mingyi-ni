// MovieDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [userReview, setUserReview] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://www.omdbapi.com/?apikey=bc9a94cb&i=${movieId}`);
                const movieData = await response.json();
                setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        // Fetch reviews for the movie from your backend
        const fetchMovieReviews = async () => {
            try {
                // Check if the movie exists in the local database
                const movieResponse = await fetch(`http://localhost:8000/movies/${movieId}`);
                const movieExists = await movieResponse.ok;

                if (movieExists) {
                    // If the movie exists, fetch its reviews
                    const reviewsResponse = await fetch(`http://localhost:8000/movies/${movieId}/reviews`);
                    const reviewsData = await reviewsResponse.json();
                    setReviews(reviewsData);
                } else {
                    // If the movie doesn't exist, set reviews to an empty array
                    setReviews([]);
                }
            } catch (error) {
                console.error('Error fetching movie reviews:', error);
            }
        };

        fetchMovieDetails();
        //fetchMovieReviews();
    }, [movieId]);

    const handleReviewSubmit = async () => {
        try {
            // Replace with your actual endpoint for submitting reviews
            await fetch(`http://localhost:8000/movies/${movieId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: userReview }),
            });

            // Refresh reviews after submitting a new one
            fetchMovieReviews();

            // Clear the review input
            setUserReview('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (!movie) {
        return <div>Loading...</div>; // Add loading state if needed
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    {/* Display movie poster */}
                    <img src={movie.Poster} alt={`${movie.Title} Poster`} className="img-fluid" />
                </div>
                <div className="col-md-8">
                    {/* Display movie details */}
                    <h2>{movie.Title}</h2>
                    <p>{movie.Year}</p>
                    <p>Rated: {movie.Rated}</p>
                    <p>Released: {movie.Released}</p>
                    <p>Runtime: {movie.Runtime}</p>
                    <p>Genre: {movie.Genre}</p>
                    <p>Director: {movie.Director}</p>
                    <p>Writer: {movie.Writer}</p>
                    <p>Actors: {movie.Actors}</p>
                    {/* Add more details as needed */}
                </div>
            </div>

            <h3>User Reviews</h3>
            <div>
                {/* Display existing reviews */}
                {reviews.map((review) => (
                    <div key={review.id} className="mb-3">
                        <p>{review.user.username}: {review.content}</p>
                    </div>
                ))}
            </div>

            {/* Add a form for users to submit reviews */}
            <form className="mt-3">
                <div className="form-group">
                    <label htmlFor="userReview">Write your review:</label>
                    <textarea
                        className="form-control"
                        id="userReview"
                        rows="3"
                        value={userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                    ></textarea>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleReviewSubmit}>
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default MovieDetailPage;
