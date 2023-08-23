import './css/style.css';
import { BiSearchAlt } from 'react-icons/bi';
import { WiHumidity } from 'react-icons/wi';
import { GiPressureCooker, GiSpeedometer } from 'react-icons/gi';
import { useEffect, useState } from 'react';


const Weather = () => {
    const [city, setCity] = useState('solan');
    const [weather, setWeather] = useState({});
    const [image, setImage] = useState('');

    useEffect(() => {
        if(weather.climate == "Rain") {
            setImage('rain');
        }
        else if(weather.climate == "Clouds") {
            setImage('cloud');
        }
        else if(weather.climate == "Clear") {
            setImage('clear');
        }
        else if(weather.climate == "Thunderstorm") {
            setImage('thunder');
        }
        else if(weather.climate == "Snow") {
            setImage('snow');
        }
        else if(weather.climate == "Drizzle") {
            setImage('drizzle');
        }
        else {
            setImage('haze');
        }
    }, [weather]);



    console.log(weather);

    const getData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3163cb8a14073d6e9b14c14d47c8a981&units=metric`)
            const data = await response.json();
            console.log(data);

            const { temp, pressure, humidity } = data.main;
            const city2 = data.name;
            const country = data.sys.country;
            const speed = data.wind.speed;
            const climate = data.weather[0].main;
            const weather_details = {
                temp,
                pressure,
                city2,
                country,
                humidity,
                speed,
                climate,
            }
            setWeather(weather_details);
        }

        catch (error) {
            console.log("Not found");
        }
    }

    useEffect(() => {
        getData();
    }, [])



    return (
        <div className="weather">
            <h1>Weather App</h1>

            <div className="container">

                <div className="search">
                    <div className="input">
                        <input type="text"
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Search City..." />
                        <div className="button" onClick={getData}><BiSearchAlt /></div>
                    </div>
                </div>

                <div className="temp">
                    <div className="city">
                        <h2>City</h2>
                        <h4>{weather.city2}</h4>
                    </div>
                    <div className="img-temp">
                        {/* <img src={rain} alt="image" className='image' /> */}

                        <div className={`img ${image}`}></div>

                        <h4>{weather.climate}</h4>
                        <h2>{weather.temp}°C</h2>
                    </div>
                    <div className="country">
                        <h2>Country</h2>
                        <h4>{weather.country}</h4>
                    </div>
                </div>

                <div className="others">
                    <div className="humidity">
                        <h3>Humidity</h3>
                        <div className="item">
                            <p>{weather.humidity}</p>
                            <div className="icon"><WiHumidity /></div>
                        </div>
                    </div>
                    <div className="pressure">
                        <h3>Pressure</h3>
                        <div className="item">
                            <p>{weather.pressure}</p>
                            <div className="icon"><GiPressureCooker /></div>
                        </div>
                    </div>
                    <div className="wind">
                        <h3>Wind Speed</h3>
                        <div className="item">
                            <p>{weather.speed}</p>
                            <div className="icon"><GiSpeedometer /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;