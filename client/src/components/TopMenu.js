import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const TopMenu = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleNavbarToggle = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    MovieHub
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleNavbarToggle}
                >
                    <span className="navbar-toggler-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Toggle navigation</span>
                </button>
                <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/reviews">
                                        Reviews
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth-debugger">
                                        Auth Debugger
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={() => logout()}>
                                        Log Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-success" onClick={() => loginWithRedirect()}>
                                    Sign In
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default TopMenu;
