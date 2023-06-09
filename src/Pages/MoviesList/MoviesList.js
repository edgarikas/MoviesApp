import React, { useCallback, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import * as action from '../../Content/actions';
import { getToken } from '../../auth/selectors';
import {
  getFavoritesMovies,
  getMovies,
  getError,
  getLoading,
} from '../../Content/selectors.js';

import { API } from '../../constants';
import Search from '../../components/Search/Search';

function LoggedUser({
  toggleFavorite,
  setMoviesLoading,
  setMoviesSucces,
  setMoviesFailure,
}) {
  const token = useSelector(getToken);
  const favoritesMovies = useSelector(getFavoritesMovies);
  const loading = useSelector(getLoading);
  const err = useSelector(getError);
  const movies = useSelector(getMovies);
  const [data, setData] = useState(movies);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const fetchData = useCallback(async () => {
    setMoviesLoading();
    if (token) {
      try {
        const requestOption = {
          method: 'GET',
          headers: { authorization: token },
        };
        const response = await fetch(API.paidContent, requestOption);
        const resultData = await response.json();

        setMoviesSucces(resultData);
      } catch (error) {
        setMoviesFailure();
      }
    } else navigate('/');
  }, [setMoviesLoading, setMoviesSucces, setMoviesFailure, token, navigate]);

  useEffect(() => {
    if (movies.length === 0) {
      fetchData();
    }
  }, [fetchData, movies]);

  useEffect(() => {
    setData(movies);
    const filteredMovies = movies.filter((movies) =>
      movies.title.toLowerCase().includes(searchTerm)
    );
    setData(filteredMovies);
  }, [movies, searchTerm]);

  return (
    <main className='App_main'>
      {err && <p>Whoops! 😱🏴‍☠️☁️</p>}
      <Search onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
      {loading ? (
        <Loader />
      ) : (
        <div className='movie-list'>
          {data.map(({ title, id, description, image }) => (
            <MovieCard
              isClickable='true'
              id={id}
              key={id}
              title={title}
              description={description}
              image={image}
              isFavorite={favoritesMovies.includes(id)}
              onToggleFavorite={() =>
                toggleFavorite(id, favoritesMovies.includes(id))
              }
            ></MovieCard>
          ))}
        </div>
      )}
    </main>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleFavorite: action.toggleFavorite,
      setMoviesLoading: action.setMoviesLoading,
      setMoviesSucces: action.setMoviesSucces,
      setMoviesFailure: action.setMoviesFailure,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(LoggedUser);
