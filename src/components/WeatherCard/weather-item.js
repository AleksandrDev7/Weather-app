import React from "react";
import './style.scss';

class WeatherItem extends React.Component {
    render() {
        const ms = this.props.item.dt * 1000;
        const weekDayName = new Date(ms).toLocaleDateString('ru', {weekday: 'long'});
        const imgURL = "owf owf-"+ this.props.item.weather[0].id +" owf-4x owf-pull-left owf-border";
        const fahrenheit = (parseInt(this.props.item.main.temp) - 273.15) * (9/5) + 32;
        const celsius = Math.trunc((fahrenheit - 32) * (5/9));

        return (
        <div className="weather-item">
            <div className="weather-item-img">
                <i className={imgURL}></i>
            </div>
            <div className="weather-item-content">
                <div className="item-content__title">
                    <span> {weekDayName[0].toUpperCase() + weekDayName.slice(1)} </span>
                </div>
                <div className="item-content__text">
                    <p className="text__cloud"> {this.props.item.weather[0].description} </p>
                    <p className="text__temp"> {celsius} </p>
                </div>
            </div>
        </div>
        )
    }
}

export default WeatherItem;