import React from "react";

import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom';

import "./HomePage.css";
import Loader  from '../../components/Loader/Loader'
import MovieCard from '../../components/MovieCard/MovieCard';
import Hero from '../../components//Hero/Hero'

const FREE_MOVIES_API = "https://dummy-video-api.onrender.com/content/free-items";



class Home extends React.Component {
  state = {
    loading: false,
    error: false,
    movies: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const response = await fetch(FREE_MOVIES_API);

      if (response.status > 399 && response.status < 600) {
        throw new Error("failed to load");
      }

      const movies = await response.json();

      this.setState({ movies });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { movies, loading, error } = this.state;
    const { favorites, toggleFavorite } = this.props;

    return (
      <div className="Home">
        {loading && <Loader/>}
        {error && <p>Whoops! Movies stolen by pirate clouds! 😱🏴‍☠️☁️</p>}
        <Hero title='Wanna More Content?' btnTitle='Get Access' />
        <div className='movie-list'>
        {movies.map(({ title, id, description, image }) => (
          <MovieCard
            id={id}
            key={id}
            title={title}
            description={description}
            image={image}
            isFavorite={favorites.includes(id)}
            onToggleFavorite={() => toggleFavorite(id)}
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
}

Home.defaultProps = {
  favorites: [],
  toggleFavorite: () => {},
};

export default Home;
