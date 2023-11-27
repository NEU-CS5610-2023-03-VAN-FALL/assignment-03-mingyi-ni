import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [userapi, setUserapi] = useState(null);

    useEffect(() => {
        if (user && user.name) {
            setNewName(userapi?.name || user.name);
        }
    }, [user, userapi]);

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const fetchUser = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const usersData = await response.json();
                setUserapi(usersData);
            } else {
                console.error('Failed to fetch user from api: ', response.statusText);
            }
        } catch (error) {
            console.error('Error fetch user from api', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUser();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    const handleUpdateProfile = async () => {
        try {
            // Prepare the updated user data
            const updatedUser = {
                name: newName,
            };

            // Get the access token
            const token = await getAccessTokenSilently();

            // Make a PATCH request to update the user's profile
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                // Successfully updated user profile in the API
                alert(`Updated Name: ${newName}`);
                setIsEditing(false);

                // You might want to refetch the user data from the API to update the local state
                fetchUser();
            } else {
                console.error('Failed to update user profile: ', response.statusText);
                // Handle error appropriately, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error updating user profile', error);
            // Handle error appropriately, e.g., show an error message to the user
        }
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            {isAuthenticated && user ? (
                <div className="card bg-dark text-white">
                    <div className="card-body">
                        <h5 className="card-title">Profile</h5>
                        {isEditing ? (
                            <div>
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={newName}
                                    onChange={handleNameChange}
                                />
                                <div className="mt-2">
                                    <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}>
                                        Save
                                    </button>
                                    <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-3">
                                    <p className="card-text">Name: {userapi?.name || user.name}</p>
                                </div>
                                <div className="mb-3">
                                    <img src={user.picture} width="70" alt="profile avatar" />
                                </div>
                                <div className="mb-3">
                                    <p className="card-text">📧 Email: {user.email}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="card-text">🔑 Auth0Id: {user.sub}</p>
                                </div>
                                <div>
                                    <p className="card-text">✅ Email verified: {user.email_verified?.toString()}</p>
                                </div>
                                <button type="button" className="btn btn-primary mt-2" onClick={() => setIsEditing(true)}>
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>Please log in to view your profile.</div>
            )}
        </div>

    );
}
