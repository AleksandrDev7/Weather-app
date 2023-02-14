import {useEffect, useState} from "react";
import ErrorPage from "../ErrorPage/index.js";
import CityName from "../CityName/index.js";
import WeatherCard from "../WeatherCard/index.js";
import {useLocation, withRouter, useHistory} from "react-router-dom";
import './style.scss';

function WeatherSearch() {
    const [value, changeValue] = useState('');
    const [error, setError ]= useState(false);
    const appId = '6997df62bdbc5e23a566e582308aff87';
    const cityName = value;
    const [city, setCity] = useState('');
    const [items, setItems] = useState([]);
    const [showNameCity, setShowName] = useState(false);
    let location = useLocation();
    let history = useHistory();

    const handleChangeValue = (e) => {
        changeValue(e.target.value);
    }

    useEffect(() => {
        document.title = (`Прогноз погоды в городе ${value}`);
    });

        const fetchData = async () => {
             await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ru&appid=${appId}`)
            .then(res => res.json())
                 .then(data =>{
                     const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"))
                     setItems(dailyData);
                     setCity(data.city);
                     setError(false);
                 })
                 .catch(error => {
                     setError(error);
                     throw new Error(`Error: ${error}`);
                 })
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
        history.push(`/${(value).toLocaleLowerCase()}`);
        setShowName(true);
    }

    useEffect(() => {
      if (location.pathname.slice(1)) {
      }
    })

    function WeatherCards() {
        return (
            items.map((item, index) =>
                <WeatherCard item={item} key={index}/>)
        );
    }

    return (
      <section>
        <div className="wrap">
          <div className="container-weather">
            <h1>Ваш прогноз погоды на 5 дней.</h1>
            <form className="search-form" onSubmit={handleSubmit} >
                <input className="search-form__input" type="text" value={value} onChange={handleChangeValue} />
                <button className="search-form__submit" type="submit">Поиск</button>
            </form>
              <div className="weather-title">
                  {error ? null : <CityName warn={showNameCity} name={value}  /> }
              </div>
              <div className="weather-content">
                  {error ? <ErrorPage /> : WeatherCards()}
              </div>
          </div>
        </div>
      </section>
  );
}


export default withRouter(WeatherSearch);
