import "./Weather.css"
import axios from "axios"
import {useState} from "react"


function Weather(){

    const API_KEY = "db6df617f394ff272f4d752089da44cc"
    const forcasts = [];
    

    const [city,setCity] = useState("");
    const [weatherData , setWeatherData] = useState(null);
    const [fiveDays,setFiveDays] = useState(null);

    const hendelInput = (e)=>{
        setCity(e.target.value);
    };
    
    const getWeather = async (city) =>{
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setWeatherData(response.data);
            
        }catch(err){
            console.log(err);
        }
    }
    const fatch5daysForcast = async (city)=>{
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
            setFiveDays(response.data)
            
        }catch(err){
            console.log(err);
        }
    }
    const hendelSubmit = (e)=>{
        e.preventDefault();
        fatch5daysForcast(city);
        getWeather(city);
    }

    const lists = () =>{
        for(let i=0;i<10;i++){
            forcasts.push(<li><span>{fiveDays.list[i].dt_txt}</span> <span>{fiveDays.list[i].main.temp_min}&#176;c/{fiveDays.list[i].main.temp_max}&#176;c</span></li>)
        }
        return forcasts;
    }

        

    return(
        <>
            <div className="container">
                <div className="manuBar">
                    <h2>Weather Updates</h2>
                </div>
                <div className="mainContent">
                    <form onSubmit={hendelSubmit}>
                        <label>Your city   <input type="text" value={city} onChange = {hendelInput}/></label> <button type="submit">search</button>
                    </form>
                    {(weatherData) && <main>
                        <div className="todayWeather">
                        <div>
                            <h1>{weatherData.name}</h1>
                            <p>{weatherData.main.temp}&#176;c</p>
                            <div className="items">Feel like {weatherData.main.feels_like}&#176;c</div>
                            <div className="items"><span>min:{weatherData.main.temp_min}&#176;c</span> <span>max:{weatherData.main.temp_max}&#176;c</span></div>
                            <div className="items">Haze:{weatherData.weather[0].main}</div>
                            
                        </div>
                        <div>
                            <div className="items">Air:{weatherData.wind.speed} km/h</div>
                            <div className="items">Pressour:{weatherData.main.pressure} pa</div>
                            <div className="items">Visibility{weatherData.visibility} km</div>
                            <div className="items">Humidity:{weatherData.main.humidity}%</div>
                        </div>
                    </div>
                    <div className="DaysForcast">
                        <ul>
                        <li><span>Times</span> <span>Min && Max Temp.</span></li>
                            {fiveDays && lists()}                            
                        </ul>
                    </div>
                    <div className="map">

                    </div>
                    </main>}
                </div>
                <div className="footer">
                    All right reserved by NURUZZAMAN
                </div>
            </div>
        </>
    )
}

export default Weather
