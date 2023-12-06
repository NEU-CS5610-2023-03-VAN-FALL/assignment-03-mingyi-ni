import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const UserReviewPage = () => {
    const {  isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [reviews, setReviews] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(() => {
        const fetchMovieDetails = async (movieId) => {
            try {
                const response = await fetch(`http://www.omdbapi.com/?apikey=bc9a94cb&i=${movieId}`);
                const data = await response.json();

                // Use the functional form of setMovieDetails to update based on previous state
                setMovieDetails((prevMovieDetails) => {
                    // Create a new object with the previous details and add the new one
                    return {
                        ...prevMovieDetails,
                        [movieId]: data,
                    };
                });
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        reviews.forEach((review) => {
            fetchMovieDetails(review.movie.imdbId);
        });
    }, [reviews]);


    useEffect(() => {
        console.log(movieDetails);
    }, [movieDetails]);


    const fetchReviews = async () => {
        if (isAuthenticated) {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const reviewsData = await response.json();
                    setReviews(reviewsData);
                } else {
                    console.error('Failed to fetch reviews:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [isAuthenticated, getAccessTokenSilently]);

    return (
        <div className="container mt-4">
            <h2 className="text-white mb-4">Your Reviews</h2>
            {reviews.map((review) => (
                <div key={review.id} className="card mb-3" style={{ backgroundColor: '#333', color: '#fff' }}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            {movieDetails[review.movie.imdbId] && (
                                <Link to={`/details/${movieDetails[review.movie.imdbId]?.imdbID}`}>
                                    <img
                                        src={movieDetails[review.movie.imdbId]?.Poster}
                                        alt={`Poster for ${movieDetails[review.movie.imdbId]?.Title}`}
                                        className="img-fluid rounded"
                                    />
                                </Link>
                            )}
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span className="text-primary">{review.user.name}</span>
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {movieDetails[review.movie.imdbId] && (
                                        <Link to={`/details/${movieDetails[review.movie.imdbId]?.imdbID}`} className="text-light">
                                            <strong>{movieDetails[review.movie.imdbId]?.Title}</strong>
                                        </Link>
                                    )}
                                </h6>
                                <p className="card-text">{review.content}</p>
                                {/* Add more details as needed */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default UserReviewPage;
