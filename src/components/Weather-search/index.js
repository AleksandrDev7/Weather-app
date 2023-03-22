import {useEffect, useState} from "react";
import ErrorPage from "../ErrorPage/index.js";
import WeatherList from '../Weather-list';
import {useLocation, withRouter, useHistory} from "react-router-dom";
import './style.scss';

const APP_ID = '6c62c9b2abeb7d9418096dc3b3927236';

function WeatherSearch() {
    let location = useLocation();
    let history = useHistory();
    const [value, changeValue] = useState(history.location.pathname.slice(1));
    const [error, setError ]= useState(false);
    const [city, setCity] = useState(null);
    const [items, setItems] = useState([]);

    const handleChangeValue = (e) => {
        changeValue(e.target.value);
    }

        useEffect(() => {
            const api = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&lang=ru&appid=${APP_ID}`;

            const fetchData = async () => {

                if (!value) {
                    return;
                }

                try {
                    const response = await fetch(api);
                    const data = await response.json();
                    if (data.cod.includes("200")) {
                        const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
                        setItems(dailyData);
                        setCity(data.city);
                        setError(false);
                    } else {
                        throw data.message;
                    }

                } catch (error) {

                        setError(true);

                        throw new Error(error);
                    }
            };

            fetchData();
        }, [location.pathname]);

    const handleSubmit = (e) => {

        e.preventDefault();

        history.push(`/${(value).toLocaleLowerCase()}`);
    }

    return (
        <section>
            <div className="wrap">
                <div className="weather">
                    <h1>Прогноз погоды - Gps<span>meteo</span></h1>
                    <form className="weather-form"
                          onSubmit={handleSubmit}
                          key={location.key}>
                        <input className="weather-form__input"
                               type="text" value={value}
                               onChange={handleChangeValue}
                               placeholder="Введите название города"
                               required
                        />
                        <button className="weather-form__submit"
                                type="submit"
                                disabled={!value}
                        >
                            Поиск
                        </button>
                    </form>

                    {error && (<ErrorPage />)}

                    {
                        !error && city &&
                        (<WeatherList items={items} city={city.name} />)
                    }

                </div>
            </div>
        </section>
  );
}


export default withRouter(WeatherSearch);
