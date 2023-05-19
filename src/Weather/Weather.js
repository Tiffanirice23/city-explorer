import React from 'react';
import './Weather.css';

class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.forecastData.map(day => (
          <ul key={day.date}>
            <li>Date: {day.date}</li>
            <li>Weather: {day.description}</li>
          </ul>
        ))}
      </>
    );
  }
}

export default Weather;
