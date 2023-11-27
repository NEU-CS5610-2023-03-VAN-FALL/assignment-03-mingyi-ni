// MovieList.js
import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie.imdbID} className="movie-item">
                    <Link to={`/details/${movie.imdbID}`}>
                        <img src={movie.Poster} alt={`${movie.Title} Poster`} className="movie-poster" />
                        <div className="movie-info">
                            <h3 className="movie-title">{movie.Title}</h3>
                            <p className="movie-year">{movie.Year}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
