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
    console.log(request.data);
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
      <div className='exploreDiv'>
        <h1 className='cityExplorerH1'> 
        <form onSubmit={this.handleCitySubmit}>
          <label className="cityExplorerLabel"> Enter a City & Get Started:
            <input className='seachCityInput' onChange={this.changeCityInput} name="city" />
          </label>
           <button type="submit" className="exploreBtn"> Explore!</button>
        </form>
        </h1>
      </div>

      <Card className='mapCard'>
        <Card.Body className="mapCardContainer">
          <Card.Title   
            className="mapCardTitle">City Name: {this.state.cityName}</Card.Title>
          <Card.Text as="div">
            <div>
              {lat && lon && <iframe
                src={mapURL}
                className="mapId"
                height='612px'
                width='612px'
                title='map'
              ></iframe>}
            </div>
          </Card.Text>
          {/* <Card.Text>
            {this.state.lat && <Card.Text>Latitude: {this.state.lat}, Longitude: {this.state.lon}</Card.Text>}
            </Card.Text> */}
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


      <Card className='movieCard'>
        <Card.Body className="movieBodyContainer">
          <Card.Title className="movieCardTitle">Movies in this City</Card.Title>
          <Card.Text as="div"className="moviePhrase">
            {this.state.movies && <Movies movies={this.state.movies}/>}
            {this.state.movies.length === 0 && 'Search for a city to see a list of movies!'}
          </Card.Text>
        </Card.Body>
      </Card>

    </>
  );
}
}

export default App;
