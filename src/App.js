import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Weather from './Weather.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      cityData: {},
      error: false,
      location: '',
      forecastData: [],
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();

    // Clear out old data in case of error on new request
    this.setState({
      forecastData: [],
      location: '',
      cityExplorerData: {},
    });

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;

    let cityData;


    try {
      cityData = await axios.get(url);
      // console.log('++++++++++++', cityData);
      console.log('++++++++++++', cityData.data[0].lat);
      
      let getWeather = `${process.env.REACT_APP_SERVER}/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}`;

      let weatherData = await axios.get(getWeather);

      this.setState({
        cityExplorerData: cityData.data[0],
        location: cityData.data[0].display_name,
        forecastData: weatherData.data,
        error: false // set error to false if the API request is successful
      });
    } catch (error) {
      console.error(error);
      this.setState({
        error: true // set error to true if the API request fails
      });
    }
    this.setState({
      cityExplorerData: cityData.data[0]
    });
  }
  

  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    })
  }

  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityExplorerData?.lat},${this.state.cityExplorerData?.lon}&zoom=11`

    return (
      <>
        <h1> City Explorer! </h1>
        <form onSubmit={this.handleCitySubmit}>
          <label id="label"> Search for a City:
            <input onChange={this.changeCityInput} name="city" />
          </label>
          <button type="submit"> Explore!</button>
        </form>

        {this.state.error && <p>An error has occured! Please try again.</p>} 
        <Card className='card' style={{ width: '30rem' }}>
          <Card.Img variant="top" src="" />
          <Card.Body className="cardContainer">
            <Card.Title className="cardTitle">City Name: {this.state.cityExplorerData?.display_name}</Card.Title>
            <Card.Text>
              <ul>
                <li> Latitude: {this.state.cityExplorerData?.lat}</li>
                <li> Longitude: {this.state.cityExplorerData?.lon}</li>
                
              </ul>

              {this.state.forecastData && <Weather forecastData={this.state.forecastData} />}

              <div>
                <iframe
                  src={mapURL}
                  className='w-100'
                  height='500'
                  title='map'
                ></iframe>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>

      </>
    );
  }
}

export default App;
