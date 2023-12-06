import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import TopMenu from '../components/TopMenu';

jest.mock('@auth0/auth0-react');

describe('TopMenu', () => {
    it('displays correct menu items when authenticated', () => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            loginWithRedirect: jest.fn(),
            logout: jest.fn(),
        });

        render(
            <Router>
                <TopMenu />
            </Router>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Profile/i)).toBeInTheDocument();
        expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
        expect(screen.getByText(/Auth Debugger/i)).toBeInTheDocument();
        expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
    });

    it('displays correct menu items when not authenticated', () => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            loginWithRedirect: jest.fn(),
            logout: jest.fn(),
        });

        render(
            <Router>
                <TopMenu />
            </Router>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
        expect(screen.queryByText(/Profile/i)).toBeNull();
        expect(screen.queryByText(/Reviews/i)).toBeNull();
        expect(screen.queryByText(/Auth Debugger/i)).toBeNull();
        expect(screen.queryByText(/Log Out/i)).toBeNull();
    });

});