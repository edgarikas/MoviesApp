import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header/Header';

import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/LoginPage/LoginPage';
import Movies from './Pages/MoviesList/MoviesList';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import Footer from './components/Footer/Footer';

import store from './state/state';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <BrowserRouter>
          <Header />
          <main className='App_main'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/content' element={<Movies />} />
              <Route path='/movie/:movieId' element={<MovieDetails />} />
            </Routes>
          </main>
        </BrowserRouter>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
