import React from 'react';

const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie.imdbID} className="movie-item">
                    <img src={movie.Poster} alt={`${movie.Title} Poster`} className="movie-poster" />
                    <div className="movie-info">
                        <h3 className="movie-title">{movie.Title}</h3>
                        <p className="movie-year">{movie.Year}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;