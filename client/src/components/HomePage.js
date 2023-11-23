import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';

const App = () => {
    const [movies, setMovies] = useState([]);

    const getMovieRequest = async () => {
        const url = `http://www.omdbapi.com/?s=star war&apikey=263d22d8`;

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
        <div className='container-fluid movie-app'>
            <div className='row'>
                <MovieList movies={movies} />
            </div>
        </div>
    );
};

export default App;