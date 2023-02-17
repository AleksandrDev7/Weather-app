import React from "react";
import './style.scss';
import WeatherItem from "./weather-item";

class WeatherList extends React.Component {
        WeatherArray = () => {
            return (
                this.props.items.map((item, index) =>
                    <WeatherItem item={item} key={index}/>)
            );
        }

    render() {
        return (
            <div className="weather-list">
                <h2 className="weather-list__subtitle">
                    Прогноз погоды в городе {this.props.city}
                </h2>
                <div>
                    {this.WeatherArray()}
                </div>
            </div>
        )
    }
}

export default WeatherList;