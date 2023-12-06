import { render, screen } from '@testing-library/react';
import AuthDebugger from '../components/AuthDebuggerPage';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import { act } from 'react-dom/test-utils';

jest.mock("@auth0/auth0-react");
jest.mock("../AuthTokenContext");

describe('AuthDebugger', () => {
    it('displays access token when provided', async () => {
        useAuth0.mockReturnValue({ user: {} });
        useAuthToken.mockReturnValue({ accessToken: 'mockAccessToken' });

        await act(async () => {
            render(<AuthDebugger />);
        });

        expect(screen.getByText(/mockAccessToken/i)).toBeInTheDocument();
    });

    it('displays user info when provided', async () => {
        useAuth0.mockReturnValue({ user: { name: 'mockUser' } });
        useAuthToken.mockReturnValue({ accessToken: '' });

        await act(async () => {
            render(<AuthDebugger />);
        });

        expect(screen.getByText(/mockUser/i)).toBeInTheDocument();
    });

    it('does not display access token when not provided', async () => {
        useAuth0.mockReturnValue({ user: {} });
        useAuthToken.mockReturnValue({ accessToken: '' });

        await act(async () => {
            render(<AuthDebugger />);
        });

        expect(screen.queryByText(/mockAccessToken/i)).toBeNull();
    });

    it('does not display user info when not provided', async () => {
        useAuth0.mockReturnValue({ user: {} });
        useAuthToken.mockReturnValue({ accessToken: 'mockAccessToken' });

        await act(async () => {
            render(<AuthDebugger />);
        });

        expect(screen.queryByText(/mockUser/i)).toBeNull();
    });
});