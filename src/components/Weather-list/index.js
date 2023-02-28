import React from "react";
import './index.scss';
import Index from "../Weather-item";

function WeatherList(props) {

        return (
            <div className="weather-list">
                <h2 className="weather-list__subtitle">
                    Прогноз погоды в городе {props.city}
                </h2>
                <div className="weather-list-items">
                    {props.items.map((item, index) =>
                        <Index item={item} key={index}/>)}
                </div>
            </div>
        )

}

export default WeatherList;