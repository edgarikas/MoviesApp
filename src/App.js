import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/LoginPage/LoginPage';
import Movies from './Pages/MoviesList/MoviesList';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import Favorites from './Pages/Favorites/Favorites';
import Layout from './components/Layout/Layout';

import store from './state/state';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/content' element={<Movies />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
