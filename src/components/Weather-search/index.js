import React from "react";
import WeatherList from '../Weather-list';
import { withRouter } from "react-router-dom";
import ErrorPage from '../ErrorPage';
import '../../components/Weather-search/style.scss';

const APP_ID = '6c62c9b2abeb7d9418096dc3b3927236';

class WeatherSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            city: null,
            value: this.props.history.location.pathname.slice(1),
            error: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        if (!this.state.value) {
            return;
        }

        const api = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&lang=ru&appid=${APP_ID}`;

        fetch(api)
            .then(res => res.json())
            .then(data => {
                if (data.cod.includes("200")) {
                    const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));

                    this.setState({
                        items: dailyData,
                        city: data.city,
                        error: false,
                    })
                } else {
                    throw data.message;
                }

            })
            .catch(error => {

                this.setState({
                    error: true
                });

                throw new Error(error);
            })
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.fetchData();

        this.props.history.push(`/${(this.state.value).toLocaleLowerCase()}`);
    }

    render() {
        return (
            <section>
                <div className="wrap">
                    <div className="weather">
                        <h1>Прогноз погоды - Gps<span>meteo</span></h1>
                        <form className="weather-form"
                              onSubmit={this.handleSubmit}
                              key={this.props.location.key}>
                            <input
                                required
                                className="weather-form__input"
                                type="text"
                                value={this.state.value}
                                onChange={this.handleChange}
                                placeholder="Введите название города"
                                />
                            <button className="weather-form__submit"
                                    type="submit"
                                    disabled={!this.state.value}
                            >
                                Поиск
                            </button>
                        </form>

                        {this.state.error && (<ErrorPage />)}

                        {
                            !this.state.error && this.state.city &&
                            (<WeatherList items={this.state.items} cityName={this.state.city.name} />)
                        }

                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(WeatherSearch);
