
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Header from './components/Header/Header';


import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/LoginPage/LoginPage';
import Content from './Pages/Content/Content'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import Footer from './components/Footer/Footer'

const FAVORITES_STORAGE_KEY = "MOVIES_FAVORITES";
const AUTH_TOKEN_STORAGE_KEY = "AUTH_TOKEN_STORAGE_KEY";



function App() {
  const [favorites, setFavorites] = useState(
    JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || []
  );

  const [authToken, setAuthToken] = useState(window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY));

  const updateAuthToken = (token) => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    setAuthToken(token);
  };


  const toggleFavorite = (id) => {
    let newFavorites = [...favorites];

    if (favorites.includes(id)) {
      newFavorites = newFavorites.filter((movieId) => movieId !== id);
    } else {
      newFavorites = newFavorites.concat(id);
    }

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };
  return (
    <div className="App">
      <BrowserRouter>
      <Header updateAuthToken={updateAuthToken} authToken={authToken} />
      <main className='App_main'>
      <Routes>
        <Route path='/' element={<HomePage favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path='/login' element={<Login updateAuthToken={updateAuthToken} />} />
        <Route
            path="/content"
            element={
              <Content
                authToken={authToken}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path='/movie/:movieId' element={<MovieDetails favorites={favorites}/>} />
      </Routes>
      </main>
   
      </BrowserRouter>
      <Footer/>
   
    </div>
  );
}

export default App;
