import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axiosInstance from '../axiosInstance.js';
import {alertErr, alertSuccess, validateInput, validateInputPassword} from '../utils.js';
import {InputBox} from '../components/InputBox.jsx';
import {cfg} from '../config.js';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const _handleSignUp = async () => {
    const handleSignUpDataObject = {
      name,
      email,
      password,
      confirmPassword,
    };

    await axiosInstance.post('/users', handleSignUpDataObject)
        .then(() => {
          alertSuccess('User created successfully');
        })
        .catch((error) => {
          alertErr(error);
        });
  };

  const _validateForm = () => {
    const newErrors = {};

    validateInput(name, cfg.namePattern, newErrors, 'name');
    validateInput(email, cfg.emailPattern, newErrors, 'email');
    validateInputPassword(password, newErrors);

    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Sign Up</h2>
        <InputBox
          label="Name"
          type="text"
          value={name}
          onChange={setName}
          error={errors.name}
        />
        <InputBox
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <InputBox
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <InputBox
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={errors.confirmPassword}
        />
        <button
          className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:ring focus:ring-gray-200"
          onClick={() => {
            if (_validateForm()) {
              _handleSignUp();
            }
          }}
        >
          Sign Up
        </button>
        <div className="mt-4 text-gray-600 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
