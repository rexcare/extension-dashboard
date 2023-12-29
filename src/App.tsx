import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { getFormattedDateTime, getGeolocationCoordinates } from "./helper";
import { GEOCoordinates, Temperature } from "./types";
import WeatherBlock from "./WeatherBlock";

function App() {
  const [count, setCount] = useState<number>(0);
  const [currentDateTime, setCurrentDateTime] = useState<string>(
    getFormattedDateTime(new Date())
  );
  const [geoCoordinates, setGeoCoordinates] = useState<GEOCoordinates | null>(
    null
  );
  const [temperature, setTemperature] = useState<Temperature | null>(null);
  const [weatherIconURL, setWeatherIconURL] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    getGeolocationCoordinates().then((data) => setGeoCoordinates(data));
  }, []);

  useEffect(() => {
    if (!geoCoordinates) return;
    fetch(
      `${import.meta.env.VITE_OPENWEATHERMAP_URL}?units=metric&lat=${
        geoCoordinates.lat
      }&lon=${geoCoordinates.long}&appid=${
        import.meta.env.VITE_OPENWEATHERMAP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setTemperature({
          min: data.main.temp_min,
          max: data.main.temp_max,
          current: data.main.temp,
        });
        setWeatherIconURL(
          import.meta.env.VITE_OPENWEATHERMAP_WEATHER_ICON_URL.replace(
            "weatherIconName",
            data.weather[0].icon
          )
        );
        setCountry(data.sys.country);
        setCity(data.name);
      })
      .catch((err) => {
        console.log(err);
        // load default data, or not to load everything
      });
  }, [geoCoordinates]);

  useEffect(() => {
    const interval = setInterval(countAndGetCurrentDate, 6000);
    return () => clearInterval(interval);
  }, [count]);

  function countAndGetCurrentDate(): void {
    setCount(count + 1);
    setCurrentDateTime(getFormattedDateTime(new Date()));
  }

  return (
    <main className="w-full h-screen bg-no-repeat bg-cover bg-center bg-fixed	bg-#82C3EC color-white grid grid-cols-3 p-4">
      <p className="col-span-2">Jen Chen</p>
      <div className="justify-self-end">
        {temperature && (
          <WeatherBlock
            weatherIconURL={weatherIconURL}
            temperatureCurrent={temperature.current}
            temperatureMin={temperature.min}
            temperatureMax={temperature.max}
          />
        )}
      </div>
      <h1 className="col-span-3 justify-self-center text-3xl md:text-6xl lg:text-8xl">
        {currentDateTime}
      </h1>
      <div className="self-end">
        {city && country && (
          <p>
            <span>{city}</span>
            <span>,</span>
            <span>{country}</span>
          </p>
        )}
      </div>
      <h2 className="justify-self-center self-center text-md md:text-3xl lg:text-4xl">
        Main focus
      </h2>
      <div className="self-end justify-self-end">Todo</div>
    </main>
  );
}

export default App;
