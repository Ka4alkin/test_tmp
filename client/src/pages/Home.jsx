import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/slices/authSlice.js';
import {alertSuccess} from '../utils.js';
import MovieList from '../components/MovieList.jsx';
import {fetchMovies} from '../store/actions/movieActions.js';
import Pagination from '../components/Pagination.jsx';
import FileUpload from '../components/FileUpload.jsx';
import Modal from '../modals/Modal.jsx';
import MovieForm from '../forms/MovieForm.jsx';
import Btn from '../components/Btn.jsx';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movie.movies);
  const pageInfo = useSelector((state) => state.movie.pageInfo);
  useEffect(() => {
    dispatch(fetchMovies(pageInfo.pageIndex));
  }, [dispatch, pageInfo.pageIndex]);

  const _handlePageChange = (pageIndex) => {
    dispatch(fetchMovies(pageIndex));
  };

  const _handleLogout = () => {
    dispatch(logout());
    alertSuccess('Logged out successfully');
    navigate('/login');
  };

  const [showMovieForm, setShowMovieForm] = useState(false);

  const _toggleMovieForm = () => {
    setShowMovieForm(!showMovieForm);
  };

  const renderedHeader = (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-700">Home</h2>
      <Btn handler={_handleLogout} content={'Log out!'}/>
    </div>
  );

  const renderedMovieListTitle = (
    <h2 className="text-2xl font-bold text-gray-700 mb-2">Movie list</h2>
  );

  const renderedEmptyMovieListContent = (
    <h2 className="text-2xl font-bold text-gray-700">No movies!</h2>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md m-5">
        {renderedHeader}
        <FileUpload />
        <div className="mb-5 flex justify-end">
          <Btn content={'Add Movie'} colorSchema={'gray'} handler={_toggleMovieForm}/>
        </div>
        <Modal isOpen={showMovieForm} onClose={_toggleMovieForm}>
          <MovieForm
            onSubmit={(movieData) => {
              _toggleMovieForm();
            }}
            onClose={_toggleMovieForm}
          />
        </Modal>
        {!!movies.length && (
          <>
            {renderedMovieListTitle}
            <MovieList movies={movies} />
            <Pagination pageInfo={pageInfo} onPageChange={_handlePageChange} />
          </>
        )}
        {!movies.length && renderedEmptyMovieListContent}
      </div>
    </div>
  );
};

export default Home;
