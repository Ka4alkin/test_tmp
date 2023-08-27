import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from '../store/slices/authSlice.js';
import {alertSuccess} from '../utils.js';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _handleLogout = () => {
    dispatch(logout());
    alertSuccess('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-700">Home</h2>
          <div>
            <button
              className="py-2 px-3 bg-gray-300 hover:bg-gray-400 text-white rounded-md focus:ring focus:ring-gray-200"
              onClick={_handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <h3>
          <p className="text-gray-600 mb-4">Welcome to the Home page!</p>
        </h3>
      </div>
    </div>
  );
};

export default Home;
