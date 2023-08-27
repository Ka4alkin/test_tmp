import React, {useState} from 'react';
import axiosInstance from '../axiosInstance.js';
import {alertErr, alertSuccess, validateInput} from '../utils.js';
import {InputBox} from '../components/InputBox.jsx';
import {fetchMovies} from '../store/actions/movieActions.js';
import {useDispatch, useSelector} from 'react-redux';
import Btn from '../components/Btn.jsx';

const allowedFormats = ['VHS', 'DVD', 'Blu-ray'];

const MovieForm = ({onSubmit, onClose}) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [format, setFormat] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const pageInfo = useSelector((state) => state.movie.pageInfo);

  const _validateForm = () => {
    const newErrors = {};

    validateInput(title, /^.{3,50}$/, newErrors, 'title', 'from 3 to 50');

    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    if (!year.match(/^(19|20)\d{2}$/) || parseInt(year) < startYear || parseInt(year) > currentYear) {
      newErrors.year = `Year must be between ${startYear} and ${currentYear}`;
    }
    if (!allowedFormats.includes(format)) {
      newErrors.format = `Invalid format allowed: ${allowedFormats}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const _handleFormSubmit = async (e) => {
    e.preventDefault();
    if (_validateForm()) {
      try {
        const formData = {
          title,
          year: parseInt(year),
          format,
          actorIds: [],
        };
        await axiosInstance.post('/movies', formData);
        alertSuccess('Movie created successfully');
        dispatch(fetchMovies(pageInfo.pageIndex));
        onClose();
      } catch (error) {
        alertErr(error);
      }
    }
  };

  return (
    <form>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Add Movie</h2>
      <InputBox
        label="Title"
        type="text"
        name="title"
        value={title}
        onChange={setTitle}
        error={errors.title}
      />
      <InputBox
        label="Year"
        min={1900}
        max={new Date().getFullYear()}
        type="number"
        name="year"
        value={year}
        onChange={setYear}
        error={errors.year}
      />
      <InputBox
        label="Format"
        type="text"
        name="format"
        value={format}
        onChange={setFormat}
        error={errors.format}
      />

      <div className="mt-4 flex justify-end">
        <div className="mr-2">
          <Btn content={'Create'} colorSchema={'blue'} handler={_handleFormSubmit}/>
        </div>
        <div>
          <Btn content={'Cancel'} colorSchema={'gray'} handler={onClose}/>
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
