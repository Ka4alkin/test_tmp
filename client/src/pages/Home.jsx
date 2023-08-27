import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/slices/authSlice.js';
import {alertSuccess} from '../utils.js';
import MovieList from '../components/MovieList.jsx';
import {fetchMovies} from '../store/actions/movieActions.js';
import LogOutBtn from '../components/LogOutBtn.jsx';
import Pagination from '../components/Pagination.jsx';
import FileUpload from '../components/FileUpload.jsx';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movie.movies);
  const pageInfo = useSelector((state) => state.movie.pageInfo);

  useEffect(() => {
    dispatch(fetchMovies( pageInfo.pageIndex));
  }, [dispatch, pageInfo.pageIndex]);

  const _handlePageChange = (pageIndex) => {
    dispatch(fetchMovies( pageIndex));
  };

  const _handleLogout = () => {
    dispatch(logout());
    alertSuccess('Logged out successfully');
    navigate('/login');
  };

  const renderedWelcome = <h3>
    <p className="text-gray-600 mb-4">Welcome to the Home page!</p>
  </h3>;

  const renderedHeader = <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-gray-700">Home</h2>
    <LogOutBtn handleLogout={_handleLogout}/>
  </div>;

  const renderedMovieListTitle = <h2 className="text-2xl font-bold text-gray-700 mb-2">Movie list</h2>;

  const renderedEmptyMovieListContent = <h2 className="text-2xl font-bold text-gray-700">No movies!</h2>;


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md m-5">
        {renderedHeader}
        {renderedWelcome}
        <FileUpload/>
        {!!movies.length && <>
          {renderedMovieListTitle}
          <MovieList movies={movies}/>
          <Pagination pageInfo={pageInfo} onPageChange={_handlePageChange}/>
        </>}

        {!movies.length && renderedEmptyMovieListContent}
      </div>
    </div>
  );
};

export default Home;
