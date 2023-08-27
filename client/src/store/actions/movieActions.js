import axiosInstance from '../../axiosInstance';
import {setMovies} from '../slices/movieSlice.js';
import {getTokenFromLocalStorage} from '../../utils.js';

export const fetchMovies = ( offset='0') => async (dispatch) => {
  const sort='year';
  const order='ASC';
  const limit ='10';

  try {
    const response = await axiosInstance.get(`/movies?sort=${sort}&order=${order}&limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });
    dispatch(setMovies(response.data));
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};
