import React from "react";
import './style.scss';
import Index from "../Weather-item";

class WeatherList extends React.Component {

    WeatherArray = () => {
            return (
                this.props.items.map((item, index) =>
                    <Index item={item} key={index}/>)

            );

        }

    render() {
        return (
            <div className="weather-list">
                <h2 className="weather-list__subtitle">
                    Прогноз погоды в городе {this.props.city}
                </h2>
                <div className="weather-list-items">
                    {this.WeatherArray()}
                </div>
            </div>
        )
    }
}

export default WeatherList;