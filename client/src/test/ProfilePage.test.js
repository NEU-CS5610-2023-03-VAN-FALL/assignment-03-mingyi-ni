import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../components/ProfilePage';
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

describe('Profile', () => {
    it('displays user profile when authenticated', () => {
        useAuth0.mockReturnValue({
            user: { name: 'mockName', picture: 'mockPicture', email: 'mockEmail', sub: 'mockSub', email_verified: true },
            isAuthenticated: true,
            isLoading: false
        });

        render(<Profile />);

        expect(screen.getByText(/mockName/i)).toBeInTheDocument();
        expect(screen.getByText(/mockEmail/i)).toBeInTheDocument();
        expect(screen.getByText(/mockSub/i)).toBeInTheDocument();
        expect(screen.getByText(/true/i)).toBeInTheDocument();
        expect(screen.getByAltText(/profile avatar/i)).toBeInTheDocument();
    });

    it('displays loading when isLoading is true', () => {
        useAuth0.mockReturnValue({
            isLoading: true
        });

        render(<Profile />);

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('displays login prompt when not authenticated', () => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            isLoading: false
        });

        render(<Profile />);

        expect(screen.getByText(/Please log in to view your profile./i)).toBeInTheDocument();
    });

    it('allows user to edit profile', () => {
        useAuth0.mockReturnValue({
            user: { name: 'mockName', picture: 'mockPicture', email: 'mockEmail', sub: 'mockSub', email_verified: true },
            isAuthenticated: true,
            isLoading: false
        });

        render(<Profile />);

        fireEvent.click(screen.getByText(/Edit/i));

        expect(screen.getByText(/Save/i)).toBeInTheDocument();
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    });
});