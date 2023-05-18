import React from 'react';
import './Movies.css';

class Movies extends React.Component {
  render() {
    // console.log('movies', this.props.movies);
    return (
      <>
        {this.props.movies.slice(0,5).map(movie => (
          <div key={movie.title}>
            <h2>Title: {movie.title}</h2>
            <p>{movie.overview}</p>
            <div>Released: {movie.release}</div>
            <img className='movieImg' src={`https://image.tmdb.org/t/p/w500${movie.image_url}`} alt="MovieImages" />
          </div>
        ))}
      </>
    );
  }
}

export default Movies;
