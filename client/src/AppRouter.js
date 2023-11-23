// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import AuthDebuggerPage from './components/AuthDebuggerPage';
import MovieDetailPage from './components/MovieDetailPage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/auth-debugger" element={<AuthDebuggerPage />} />
                <Route path="/movie/:movieId" element={<MovieDetailPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
