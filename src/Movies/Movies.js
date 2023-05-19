import React from 'react';
import './Movies.css';

class Movies extends React.Component {
  render() {
    // console.log('movies', this.props.movies);
    return (
      <>
        {this.props.movies.slice(0,5).map(movie => (
          <div className="movie" key={`${movie.title}.${movie.release}`}>
            <img className='movieImg' src={`https://image.tmdb.org/t/p/w500${movie.image_url}`} alt="MovieImages" />
            <h2>Title: {movie.title}</h2>
            <p>{movie.overview}</p>
            <div>Released: {movie.release}</div>
          </div>
        ))}
      </>
    );
  }
}

export default Movies;
