import React from "react";
import WeatherList from '../WeatherCard';
import { withRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import '../../../../Weather-app/src/components/Weather-search/style.scss';

class WeatherSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            items: [],
            city: '',
            value: this.props.location.pathname.slice(1) ? this.props.location.pathname.slice(1) : "",
            showNameCity: false,
            appId: '6c62c9b2abeb7d9418096dc3b3927236',
            disabled: true,
            required: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
y

    refreshFetch() {
        const cityName = this.state.value;
        const WeatherApiLink = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ru&appid=${this.state.appId}`;

        fetch(WeatherApiLink)
            .then(res => res.json())
            .then(data => {
                if (data.cod.includes("200")) {
                    const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
                    this.setState({
                        items: dailyData,
                        city: data.city,
                        error: false
                    })
                }  else return;
            })
            .catch(error => {
                this.setState({
                    error
                });
                throw new Error(`Error: ${error}`);
            })
    }

    componentDidMount() {
        if (this.props.location.pathname.slice(1)) {
            this.refreshFetch();
        }
    }

    inputLock() {
        if (this.state.value === this.state.value.replace(/[^а-яёА-ЯЁ\s- ]/g,"")) {
            this.setState({
                disabled: false,
                required: false
            });
        } else this.setState({
            disabled: true,
            required: true
        });

        if (this.state.value === '') {
            this.setState({
                required: false
            });
        } else this.setState({
            required: true
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.inputLock();
    }

    handleSubmit(event) {
        const text = (this.state.value)[0].toUpperCase() + (this.state.value).slice(1);
        event.preventDefault();
        this.refreshFetch();
        this.inputLock();
        this.setState({
            showNameCity: true,
            text,
        });
        this.props.history.push(`/${(this.state.value).toLocaleLowerCase()}`);
    }

    render() {
        return (
            <section>
                <div className="wrap">
                    <div className="weather">
                        <h1>Прогноз погоды на 5 дней.</h1>
                        <form className="weather-form" onSubmit={this.handleSubmit}>
                            <input className="weather-form__input" type="text" value={this.state.value}
                                   onChange={this.handleChange} placeholder="Название города" required={this.state.required}/>
                            <button className="weather-form__submit" type="submit" disabled={this.state.disabled}>Поиск</button>
                        </form>
                        { this.state.error ? <ErrorPage /> : <WeatherList items={this.state.items} city={this.state.value}/> }
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(WeatherSearch);
