import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getFavoritesMovies,
  getMovies,
  getError,
  getLoading,
} from '../../Content/selectors';
import { API } from '../../constants';
import * as action from '../../Content/actions';
import Loader from '../../components/Loader/Loader';
import MovieCard from '../../components/MovieCard/MovieCard';
import Button from '../../components/Button/Button';

import './Favorites.css';

function Favorites() {
  const favoritesMovies = useSelector(getFavoritesMovies);
  const err = useSelector(getError);
  const loading = useSelector(getLoading);
  const movies = useSelector(getMovies);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    dispatch(action.setMoviesLoading());
    try {
      const response = await fetch(API.freeContent);

      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to load');
      }
      const resultData = await response.json();

      dispatch(action.setMoviesSucces(resultData));
    } catch (error) {
      dispatch(action.setMoviesFailure());
    }
  }, [dispatch]);

  if (movies.length < 1) {
    fetchData();
  }
  const favMovies = [];
  movies.forEach((movie) => {
    favoritesMovies.forEach((fav) => {
      if (movie.id === fav) {
        favMovies.push(movie);
      }
    });
  });

  const backToContent = () => {
    navigate(-1);
  };

  return (
    <div>
      {loading && <Loader />}
      {err && <p>Whoops! Movies stolen by pirate clouds! 😱🏴‍☠️☁️</p>}
      <Button size='small' onClick={() => backToContent()}>
        Back
      </Button>
      <h1 className='title'>Favorites Movies ❤️</h1>
      <div className='favorite--movies'>
        {favMovies.map(({ title, id, description, image }) => (
          <MovieCard
            isClickable='true'
            id={id}
            key={id}
            title={title}
            description={description}
            image={image}
            isFavorite={favoritesMovies.includes(id)}
            onToggleFavorite={() =>
              dispatch(action.toggleFavorite(id, favoritesMovies.includes(id)))
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
