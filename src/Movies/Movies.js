import React from 'react';
import './Movies.css';
import { Card } from 'react-bootstrap';

class Movies extends React.Component {
  render() {
    return (
      <>
        {this.props.movies.slice(0,30).map(movie => (
          <Card 
            key={`${movie.title}.${movie.release}`}
              className='insideMovieCard'>
            <Card.Title 
              className='movieTitle'>
              {movie.title}
            </Card.Title>
            {movie.image_url ? (
              <Card.Img
                className='movieImg' 
                src={`https://image.tmdb.org/t/p/w500${movie.image_url}`} 
                alt="MovieImages" 
              /> 
              ):( 
                ''
                )}
              <Card.Text className='movieReleased'> 
                  Released: {movie.release}
              </Card.Text>
              <Card.Text className='movieOverview'>
                Overview: {movie.overview}
              </Card.Text>
            </Card>
        ))}
      </>
    );
  }
}

export default Movies;
