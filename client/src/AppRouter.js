// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import VerifyUser from './components/VerifyUser';
import ProfilePage from './components/ProfilePage';
import AuthDebuggerPage from './components/AuthDebuggerPage';
import MovieDetailPage from './components/MovieDetailPage';
import TopMenu from './components/TopMenu'; // Import the TopMenu component

const AppRouter = () => {
    return (
        <Router>
            {/* Include the TopMenu component for a consistent top menu */}
            <TopMenu />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/verify-user" element={<VerifyUser />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/auth-debugger" element={<AuthDebuggerPage />} />
                <Route path="/movie/:movieId" element={<MovieDetailPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
