import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Recipes from './pages/Recipes';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          {/* Chráněná cesta pro domovskou stránku */}
          <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
          <Route path='/recipes' element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
