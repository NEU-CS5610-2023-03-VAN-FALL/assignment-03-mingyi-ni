import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';

const App = () => {
    const [movies, setMovies] = useState([]);

    const getMovieRequest = async () => {
        const url = `http://www.omdbapi.com/?s=marvel&apikey=263d22d8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        getMovieRequest();
    }, []);

    return (
        <div className="movie-app">
            <header>
                <h1 className="app-title">Marvel Movies</h1>
            </header>
            <div className="container">
                <MovieList movies={movies} />
            </div>
        </div>
    );
};

export default App;