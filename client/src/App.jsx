import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import NotFound from './components/NotFound.jsx';
import './index.css';
import Signup from './components/Signup.jsx';
import {useSelector} from 'react-redux';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
