// App.js or main component

import React from 'react';
import { Routes, Route } from 'react-router-dom';


// Importing the components for different pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';  // Optional: Homepage to navigate after login/signup

function App() {
  return (
   
      <Routes>
        {/* Define routes for the Login and Signup pages */}
        <Route path="/" element={<Home />} />   {/* Home page (optional) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  );
}

export default App;
