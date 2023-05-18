import React from 'react';

class Movies extends React.Component {
  render() {
    console.log('movies', this.props.movies);
    return (
      <>
        {this.props.movies.map(movie => (
          <ul>
            <h2>Title: {movie.title}</h2>
            <li>Release: {movie.release}</li>
            <li>Overview: {movie.overview}</li>
          </ul>
        ))}
      </>
    );
  }
}

export default Movies;
