import React from "react";
import WeatherCard from '../WeatherCard';
import CityName from '../CityName.js';
import { withRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import '../../../../weather-app/src/components/Weather-search/style.scss';

class WeatherSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            items: [],
            city: '',
            value: this.props.location.pathname.slice(1) ? this.props.location.pathname.slice(1) : '',
            showNameCity: false,
            appId: '6c62c9b2abeb7d9418096dc3b3927236',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.location.pathname.slice(1)) {
            this.refreshFetch();
        }
    }

    refreshFetch() {
        const cityName = this.state.value;
        const WeatherApiLink = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ru&appid=${this.state.appId}`;

        fetch(WeatherApiLink)
            .then(res => res.json())
            .then(data => {
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"))
                this.setState({
                    items: dailyData,
                    city: data.city,
                    error: false
                })
            })
            .catch(error => {
                this.setState({
                    error
                });
                throw new Error(`Error: ${error}`);
            })
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        const text = (this.state.value)[0].toUpperCase() + (this.state.value).slice(1);

        event.preventDefault();
        this.refreshFetch();
        this.setState({
            showNameCity: true,
            text,
        });
        this.props.history.push(`/${(this.state.value).toLocaleLowerCase()}`);
    }

    WeatherCards = () => {
        return (
            this.state.items.map((item, index) =>
                <WeatherCard item={item} key={index}/>)
        );
    }

    render() {
        return (
            <section>
                <div className="wrap">
                    <div className="container-weather">
                        <h1>Ваш прогноз погоды на 5 дней.</h1>
                        <form className="search-form" onSubmit={this.handleSubmit}>
                            <input className="search-form__input" type="text" value={this.state.value}
                                   onChange={this.handleChange} placeholder="Название города"/>
                            <button className="search-form__submit" type="submit">Поиск</button>
                        </form>
                        <div className="weather-title">
                            { this.state.error ? null : <CityName warn={this.state.showNameCity} name={this.state.text}  /> }
                        </div>
                        <div className="weather-content">
                            { this.state.error ? <ErrorPage /> : this.WeatherCards() }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(WeatherSearch);
