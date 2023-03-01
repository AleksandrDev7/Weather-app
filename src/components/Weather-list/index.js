import React from "react";
import './style.scss';
import WeatherItem from "../Weather-item";

class WeatherList extends React.Component {

    WeatherItem = () => {
        return (
            this.props.items.map((item, index) =>
                <WeatherItem item={item} key={index}/>
            )
        );
    }

    render() {
        return (
            <div className="weather-list">
                <h2 className="weather-list__subtitle">
                    Прогноз погоды в городе {this.props.cityName}
                </h2>
                <div className="weather-list-items">
                    {this.WeatherItem()}
                </div>
            </div>
        )
    }
}

export default WeatherList;