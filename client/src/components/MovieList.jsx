import React from 'react';
import MovieCard from './MovieCard';
import axiosInstance from '../axiosInstance.js';
import {alertErr, alertSuccess} from '../utils.js';
import {fetchMovies} from '../store/actions/movieActions.js';
import {useDispatch} from 'react-redux';

const MovieList = ({movies}) => {
  const dispatch = useDispatch();

  const _onMovieDelete = async (id) => {
    await axiosInstance.delete(`/movies/${id}` )
        .then(() => {
          alertSuccess(`Deleted successfully`);
        })
        .then(()=>{
          dispatch(fetchMovies('0'));
        })
        .catch((error) => {
          alertErr(error);
        });
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onDelete={()=>_onMovieDelete(movie.id)} />
      ))}
    </div>
  );
};

export default MovieList;
