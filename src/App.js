import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Weather from './Weather/Weather.js';
import Movies from './Movies/Movies.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      cityData: {},
      error: false,
      location: '',
      forecastData: [],
      movies: [],
      lat: '',
      lon: '',
      errorMessage: '',
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();

    // // Clear out old data in case of error on new request
    // this.setState({
    //   forecastData: [],
    //   location: '',
    //   cityExplorerData: {},
    // });
    let cityData;
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;
      cityData = await axios.get(url);
      this.setState({
        // cityExplorerData: cityData.data[0],
        location: cityData.data[0].display_name,
        lat: cityData.data[0].lat,
        lon: cityData.data[0].lon,
        error: false // set error to false if the API request is successful
      });
    } catch (e) {
      console.log(e.message);
      this.setState({
        errorMessage: e.message
      })
    }
    // this.getWeather(cityData.data[0].lat, cityData.data[0].lon);
    this.getMovies();
  }

  getWeather = async (lat, lon) => {
  try {
    let url = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`);
    this.setState({
      forecastData: url.data || []
    })
  } catch (error) {
    // console.error('Error from weather function', error.message);
    this.setState({
      error: true // set error to true if the API request fails
    });
  }
}

getMovies = async () => {
  try {
    let request = await axios.get(`${process.env.REACT_APP_SERVER}/movies?cityName=${this.state.cityName}`);
    this.setState({
      movies: request.data,
    })
  } catch (e) {
    this.setState({
      error: true // set error to true if the API request fails
    });
  }
}



changeCityInput = (e) => {
  this.setState({
    cityName: e.target.value
  })
}

render() {
  const { lat, lon } = this.state;
  let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=11`
  return (
    <>
      <h1> City Explorer! </h1>
      <form onSubmit={this.handleCitySubmit}>
        <label id="label"> Search for a City:
          <input onChange={this.changeCityInput} name="city" />
        </label>
        <button type="submit"> Explore!</button>
      </form>


      {/* {this.state.error && <h1>An error has occured! Please try again.</h1>} */}
      <Card className='card'>
        <Card.Body className="cardContainer">
          <Card.Title className="cardTitle">City Name: {this.state.cityName}</Card.Title>
          {this.state.lat && <Card.Text>Latitude: {this.state.lat}, Longitude: {this.state.lon}</Card.Text>}
          <Card.Text as="div">
            <div id="mapID">
              {lat && lon && <iframe
                src={mapURL}
                height='650px'
                width='650px'
                title='map'
              ></iframe>}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* <Card className='card'>
        <Card.Body className="cardContainer">
          <Card.Title className="cardTitle">5 Day Weather Forecast</Card.Title>
          <Card.Text as="div">
            <Weather forecastData={this.state.forecastData} />
          </Card.Text>
        </Card.Body>
      </Card> */}


      <Card className='card movieCard'>
        <Card.Body className="cardContainer">
          <Card.Title className="cardTitle">Movies in this City</Card.Title>
          <Card.Text as="div">
            {this.state.movies && <Movies movies={this.state.movies} />}
            {this.state.movies.length === 0 && 'No movies found'}
          </Card.Text>
        </Card.Body>
      </Card>

    </>
  );
}
}

export default App;
