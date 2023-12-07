// MovieDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";

const MovieDetailPage = () => {
    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [userReview, setUserReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const [modifiedReviewContent, setModifiedReviewContent] = useState('');
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [modifiedReviewId, setModifiedReviewId] = useState(null);


    const isCurrentUser = (review) => {
        return isAuthenticated && user.sub === review.user.auth0Id;
    };

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_REVIEW}&i=${movieId}`);
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
            const movieResponse = await fetch(`${process.env.REACT_APP_API_URL}/movies/${movieId}`);
            const movieExists = movieResponse.ok;
            const movieData = await movieResponse.json();

            if (movieExists) {
                // If the movie exists, fetch its reviews
                const reviewsResponse = await fetch(`${process.env.REACT_APP_API_URL}/reviews/movie/${movieData.id}`);
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

    useEffect(() => {
        fetchMovieDetails();
        fetchMovieReviews();
    }, [movieId]);

    const handleReviewSubmit = async () => {
        if(!isAuthenticated){
            await loginWithRedirect({
                appState: {returnTo: window.location.pathname},
            });
            return;
        }
        try {
            const token = await getAccessTokenSilently();
            // Create the movie first
            const movieResponse = await fetch(`${process.env.REACT_APP_API_URL}/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: movie.Title, imdbId: movie.imdbID }), // Add the necessary movie information
            });

            if (!movieResponse.ok) {
                throw new Error('Failed to create the movie');
            }

            // Get the created movie from the response
            const movieData = await movieResponse.json();
            const movieId = movieData.id; // Adjust this based on your actual movie ID field

            // Create the review with the movie ID
            await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content: userReview, movieId }),
            });

            // Refresh reviews after submitting a new one
            await fetchMovieReviews();

            // Clear the review input
            setUserReview('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleReviewDelete = async (review) => {
        try {
            // Send a request to your API to delete the review
            const token = await getAccessTokenSilently();
            const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${review.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the user's access token
                },
            });

            if (response.ok) {
                // If the deletion is successful, trigger the onDeleteReview callback
                await fetchMovieReviews();
            } else {
                // Handle error cases, e.g., show an error message
                console.error('Error deleting review:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const handleReviewModify = (review) => {
        // Open the modify modal and pre-fill the input with the current review content
        setIsModifyModalOpen(true);
        setModifiedReviewId(review.id);
        setModifiedReviewContent(review.content);
    };

    const handleModifySubmit = async (review) => {
        try {
            const token = await getAccessTokenSilently();
            // Send a request to your API to update the review content
            const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${review.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the user's access token
                },
                body: JSON.stringify({ content: modifiedReviewContent }),
            });

            if (response.ok) {
                // If the update is successful, close the modify modal and update the review content
                setIsModifyModalOpen(false);
                await fetchMovieReviews();
            } else {
                // Handle error cases, e.g., show an error message
                console.error('Error updating review:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating review:', error);
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

            <div>
                <h3 className="text-white">User Reviews</h3>
                <div>
                    {/* Display existing reviews */}
                    {reviews.map((review) => (
                        <div key={review.id} className="card mb-3" style={{ backgroundColor: '#333', color: '#fff' }}>
                            <div className="card-body">
                                <h5 className="card-title text-primary">{review.user.name}</h5>
                                <p className="card-text">{review.content}</p>
                                {isCurrentUser(review) && (
                                    <div>
                                        <button
                                            className="btn btn-primary ml-2"
                                            onClick={() => handleReviewModify(review)}
                                        >
                                            Modify
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleReviewDelete(review)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>

                            {isModifyModalOpen && review.id === modifiedReviewId && (
                                <div className="card bg-dark text-white mb-3">
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="modifiedReview" className="form-label">
                                                Modified Review:
                                            </label>
                                            <textarea
                                                id="modifiedReview"
                                                className="form-control"
                                                value={modifiedReviewContent}
                                                onChange={(e) => setModifiedReviewContent(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <button className="btn btn-primary" onClick={() => handleModifySubmit(review)}>
                                                Save Modification
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
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
