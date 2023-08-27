import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx';
import LoginForm from './forms/LoginForm.jsx';
import NotFound from './components/NotFound.jsx';
import './index.css';
import Signup from './forms/SignupForm.jsx';
import {useSelector} from 'react-redux';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
