import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserReviewPage = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
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

        fetchReviews();
    }, [isAuthenticated, getAccessTokenSilently]);

    return (
        <div>
            <h2>Your Reviews</h2>
            {reviews.map((review) => (
                <div key={review.id}>
                    <p>{review.content}</p>
                    {/* Add more details as needed */}
                </div>
            ))}
        </div>
    );
};

export default UserReviewPage;
