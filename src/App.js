import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props){
    super (props);
    this.state = {
      value: ''
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=Seattle&format=json`;
    
    let cityData = await axios.get(url);    
    this.setState ({
      cityExplorerData: cityData.data[0]
    });
  }

  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    })
  }

  render () {
    return (
      <>
      <h1> Data from an API </h1>
      <form onSubmit={this.handleCitySubmit}>
        <label> Search for a City:
          <input name="city"/>
        </label>
        <button type="submit"> Explore!</button>
      </form>

      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>City Name: {this.state.cityExplorerData?.display_name}</Card.Title>
        <Card.Text>
          <ul>
            <li> Latitude: {this.state.cityExplorerData?.lat}</li>
            <li> Longitude: {this.state.cityExplorerData?.lon}</li>
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>

      </>
    );
  }
}

export default App;
