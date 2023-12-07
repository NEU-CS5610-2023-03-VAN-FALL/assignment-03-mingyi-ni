import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import MovieListHeading from "./MovieListHeading";
import SearchBox from "./SearchBox";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const getMovieRequest = async () => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_OMDB_SEARCH}`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    return (
        <div className="movie-app">
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Search for Movies' />
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <header>
                <h1 className="app-title">Movies</h1>
            </header>
            <div className="container">
                <MovieList movies={movies} />
            </div>
        </div>
    );
};

export default App;