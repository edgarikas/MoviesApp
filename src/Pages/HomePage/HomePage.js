import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFavoritesMovies,
  getMovies,
  getError,
  getLoading,
} from '../../Content/selectors.js';
import * as action from '../../Content/actions';

import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

import './HomePage.css';
import Loader from '../../components/Loader/Loader';
import MovieCard from '../../components/MovieCard/MovieCard';
import Hero from '../../components//Hero/Hero';

const FREE_MOVIES_API =
  'https://dummy-video-api.onrender.com/content/free-items';

function HomePage() {
  const favoritesMovies = useSelector(getFavoritesMovies);
  const err = useSelector(getError);
  const loading = useSelector(getLoading);
  const movies = useSelector(getMovies);

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    dispatch(action.setMoviesLoading());
    try {
      const response = await fetch(FREE_MOVIES_API);

      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to load');
      }
      const resultData = await response.json();

      dispatch(action.setMoviesSucces(resultData));
    } catch (error) {
      dispatch(action.setMoviesFailure());
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='Home'>
      {loading && <Loader />}
      {err && <p>Whoops! Movies stolen by pirate clouds! 😱🏴‍☠️☁️</p>}
      <Hero title='Wanna More Content?' btnTitle='Get Access' />
      <div className='movie-list'>
        {movies.map(({ title, id, description, image }) => (
          <MovieCard
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
      <div className='moreContent'>
        <Link to='/login'>
          <Button>Get More Content </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
