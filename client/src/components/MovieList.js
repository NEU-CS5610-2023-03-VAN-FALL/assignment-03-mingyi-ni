import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="col mb-4">
                        <Link to={`/details/${movie.imdbID}`} className="text-decoration-none">
                            <div className="card h-100">
                                <img
                                    src={movie.Poster}
                                    alt={`${movie.Title} Poster`}
                                    className="card-img-top movie-poster img-fluid"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title={movie.Title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.Title}</h5>
                                    <p className="card-text">{movie.Year}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
