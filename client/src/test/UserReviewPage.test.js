import { render, screen, waitFor } from '@testing-library/react';
import UserReviewPage from '../components/UserReviewPage';
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock("@auth0/auth0-react");

describe('UserReviewPage', () => {
    it('displays user reviews when authenticated', async () => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            getAccessTokenSilently: jest.fn().mockResolvedValue('mockToken'),
        });

        global.fetch = jest.fn().mockImplementation((url) => {
            if (url.includes('reviews')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 'mockReviewId1', content: 'mockContent1', user: { name: 'mockName1' }, movie: { imdbId: 'mockImdbId1' } },
                        { id: 'mockReviewId2', content: 'mockContent2', user: { name: 'mockName2' }, movie: { imdbId: 'mockImdbId2' } },
                    ]),
                });
            } else if (url.includes('omdbapi')) {
                return Promise.resolve({
                    json: () => Promise.resolve({ Title: 'mockTitle', Year: 'mockYear', Poster: 'mockPoster' }),
                });
            }
        });

        render(
            <Router>
                <UserReviewPage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText(/mockContent1/i)).toBeInTheDocument();
            expect(screen.getByText(/mockName1/i)).toBeInTheDocument();
            expect(screen.getByText(/mockContent2/i)).toBeInTheDocument();
            expect(screen.getByText(/mockName2/i)).toBeInTheDocument();
        });
    });

    it('does not display user reviews when not authenticated', async () => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            getAccessTokenSilently: jest.fn().mockResolvedValue('mockToken'),
        });

        render(
            <Router>
                <UserReviewPage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.queryByText(/mockContent1/i)).toBeNull();
            expect(screen.queryByText(/mockName1/i)).toBeNull();
            expect(screen.queryByText(/mockContent2/i)).toBeNull();
            expect(screen.queryByText(/mockName2/i)).toBeNull();
        });
    });
});