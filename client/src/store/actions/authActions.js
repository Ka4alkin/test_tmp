import {loginSuccess} from '../slices/authSlice';
import axiosInstance from '../../axiosInstance.js';
import {alertErr, alertSuccess} from '../../utils.js';

export const login = (userData, navigate) => async (dispatch) => {
  await axiosInstance.post('/sessions', userData)
      .then((response) => {
        const {token, ...user} = response.data;
        dispatch(loginSuccess({token, user}));
        navigate('/');
        alertSuccess('Login successfully');
      })
      .catch((error) => {
        alertErr(error);
      });
};

