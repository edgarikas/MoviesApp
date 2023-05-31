import React, { useCallback, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';

import { getToken } from '../../auth/selectors';
import * as action from '../../Content/actions';

import {
  getFavoritesMovies,
  getMovies,
  getError,
  getLoading,
} from '../../Content/selectors.js';

import './MovieDetails.css';
import Button from '../../components/Button/Button';

function MovieDetails({
  toggleFavorite,
  setMoviesLoading,
  setMoviesSucces,
  setMoviesFailure,
}) {
  const favoritesMovies = useSelector(getFavoritesMovies);
  const movies = useSelector(getMovies);
  const err = useSelector(getError);
  const loading = useSelector(getLoading);
  const token = useSelector(getToken);
  const navigate = useNavigate();

  const [showTutorial, setShowTutorial] = useState(false);
  const { movieId } = useParams();

  const movie = movies.filter(({ id }) => movieId === id);
  const fetchMovie = useCallback(async () => {
    setMoviesLoading();
    if (token)
      try {
        const response = await fetch(
          `https://dummy-video-api.onrender.com/content/items/${movieId}`,
          { headers: { authorization: token } }
        );
        if (response.ok) {
          const movie = await response.json();

          setMoviesSucces(movie);
        } else {
        }
      } catch (error) {
        setMoviesFailure();
      }
  }, [setMoviesLoading, setMoviesSucces, setMoviesFailure, movieId, token]);

  useEffect(() => {
    if (movie.length === 0) {
      fetchMovie();
    }
  }, [movie, fetchMovie]);

  const handleWatch = () => {
    setShowTutorial(!showTutorial);
  };

  const backToContent = () => {
    navigate('/content');
  };

  return (
    <div>
      {loading && <Loader />}
      {err && <p>Oops! Something Wrong...</p>}
      {movie.length > 0 && (
        <div>
          <Button size='small' onClick={() => backToContent()}>
            Back
          </Button>

          <div className='iframe' id={showTutorial ? '' : 'hide'}>
            <Button size='very-small' onClick={() => handleWatch()}>
              X
            </Button>
            <iframe
              title='movie-tutorial'
              id={showTutorial ? '' : 'hide'}
              src={movie[0].video}
              frameBorder='0'
              allowFullScreen
            />
          </div>

          <div className='movie' id={showTutorial ? 'hide' : ''}>
            <div className='movie__image'>
              <img src={movie[0].image} alt='movieImage' />
            </div>
            <div className='movie__about'>
              <h1 className='movie__about--title'>{movie[0].title}</h1>
              <p>{movie[0].description}</p>

              <div className='movie__about--buttons'>
                <Button size='small' onClick={() => handleWatch()}>
                  Watch
                </Button>

                <Button
                  design={
                    favoritesMovies.includes(movie[0].id) ? 'outline' : null
                  }
                  onClick={() =>
                    toggleFavorite(
                      movie[0].id,
                      favoritesMovies.includes(movie[0].id)
                    )
                  }
                  size='small'
                >
                  {favoritesMovies.includes(movie[0].id) ? 'Remove' : 'Add'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {movie.length === 0 && (
        <div className='error'>
          <h1 className='errorTitle'>This Movie Data is not exist...</h1>
          <Link to='/content'>
            <Button>Back To Movie List</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    favoritesMovies: getFavoritesMovies(state),
    movies: getMovies(state),
    err: getError(state),
    loading: getLoading(state),
    token: getToken(state),
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
