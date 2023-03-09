import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import HomePage from './pages/HomePage';

// browser router
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}>  </Route> 
          <Route path="/home" element={<HomePage />}>  </Route> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
