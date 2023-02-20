import React from "react";
import './index.scss';

class Index extends React.Component {
    render() {
        const ms = this.props.item.dt * 1000;
        const weekDayName = new Date(ms).toLocaleDateString('ru', {weekday: 'long'});
        const imgURL = "owf owf-"+ this.props.item.weather[0].id +" owf-4x owf-pull-left";
        const fahrenheit = (parseInt(this.props.item.main.temp) - 273.15) * (9/5) + 32;
        const celsius = Math.trunc((fahrenheit - 32) * (5/9));

        return (
        <div className="item">

            <div className="item-content">
                <div className="item-content__dayName">
                    <span> {weekDayName[0].toUpperCase() + weekDayName.slice(1)} </span>
                </div>
                <div className="item-content-img">
                    <i className={imgURL}></i>
                </div>
                <div className="item-content__conditions">
                    <p className="conditions__cloud"> {this.props.item.weather[0].description} </p>
                    <p className="conditions__temp"> {celsius} </p>
                </div>
            </div>
        </div>
        )
    }
}

export default Index;