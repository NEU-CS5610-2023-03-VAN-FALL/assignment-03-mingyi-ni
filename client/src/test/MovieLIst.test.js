import { render, screen } from '@testing-library/react';
import MovieList from '../components/MovieList';
import { BrowserRouter as Router } from 'react-router-dom';

describe('MovieList', () => {
    it('displays movie details when provided', () => {
        const movies = [
            { imdbID: 'mockImdbID1', Title: 'mockTitle1', Year: 'mockYear1', Poster: 'mockPoster1' },
            { imdbID: 'mockImdbID2', Title: 'mockTitle2', Year: 'mockYear2', Poster: 'mockPoster2' },
        ];

        render(
            <Router>
                <MovieList movies={movies} />
            </Router>
        );

        movies.forEach(movie => {
            expect(screen.getByText(movie.Title)).toBeInTheDocument();
            expect(screen.getByText(movie.Year)).toBeInTheDocument();
            expect(screen.getByAltText(`${movie.Title} Poster`)).toBeInTheDocument();
        });
    });

    it('does not display movie details when not provided', () => {
        const movies = [];

        render(
            <Router>
                <MovieList movies={movies} />
            </Router>
        );

        expect(screen.queryByText(/mockTitle/i)).toBeNull();
        expect(screen.queryByText(/mockYear/i)).toBeNull();
        expect(screen.queryByAltText(/Poster/i)).toBeNull();
    });
});