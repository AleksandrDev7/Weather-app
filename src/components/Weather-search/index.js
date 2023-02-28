import {useEffect, useState} from "react";
import ErrorPage from "../ErrorPage/index.js";
import WeatherList from '../Weather-list';
import {useLocation, withRouter, useHistory} from "react-router-dom";
import './style.scss';

function WeatherSearch() {
    let location = useLocation();
    let history = useHistory();
    const [value, changeValue] = useState(location.pathname.slice(1) ? location.pathname.slice(1) : '');
    const [error, setError ]= useState(false);
    const appId = '6997df62bdbc5e23a566e582308aff87';
    const cityName = value;
    const [city, setCity] = useState('');
    const [items, setItems] = useState([]);
    const [showNameCity, setShowName] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [required, setRequired] = useState(true);
    const [text, setText] = useState(value);


    const handleChangeValue = (e) => {
        changeValue(e.target.value);
        inputLock();
    }

        const fetchData = async () => {
             await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ru&appid=${appId}`)
                 .then(res => res.json())
                 .then(data => {
                     if (data.cod.includes("200")) {
                         const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
                             setItems(dailyData);
                             setCity(data.city);
                             setError(false);
                             setText(value[0].toUpperCase() + value.slice(1));
                        console.log(data);
                     } else throw error;
                 })
                 .catch(error => {

                     setError(true);

                     throw new Error(`Error: ${error}`);
                 })
                 .catch(e => {
                     console.log(e);
                 });
        }

    useEffect(() => {
        if (location.pathname.slice(1)) {
            setDisabled(false);
            setRequired(false);
            setShowName(true);
            setCity(location.pathname.slice(1));
            fetchData();
        }
    },[location.pathname] );

    function inputLock() {
        if (value === value.replace(/[^а-яёА-ЯЁ\s- ]/g)) {
            setDisabled(false);
            setRequired(false);
        } else {
            setDisabled(true);
            setRequired(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        inputLock();
        fetchData();
        history.push(`/${(value).toLocaleLowerCase()}`);
        setShowName(true);
    }


    return (
        <section>
            <div className="wrap">
                <div className="weather">
                    <h1>Прогноз погоды - Gps<span>meteo</span></h1>
                    <form className="weather-form" onSubmit={handleSubmit} key={location.key}>
                        <input className="weather-form__input" type="text" value={value}
                               onChange={handleChangeValue} placeholder="Введите название города" required={required}/>
                        <button className="weather-form__submit" type="submit" disabled={disabled}>Поиск</button>
                    </form>

                    {error && (<ErrorPage />)}
                    {!error && showNameCity && (<WeatherList items={items} city={text} />) }


                </div>
            </div>
        </section>
  );
}


export default withRouter(WeatherSearch);
