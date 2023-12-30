import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { getFormattedDateTime, getGeolocationCoordinates } from "./helper";
import { GEOCoordinates, Quote, Temperature } from "./types";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    getGeolocationCoordinates().then((data) => setGeoCoordinates(data));
  }, []);

  useEffect(() => {
    if (!geoCoordinates) return;

    const fetchWeather = async (): Promise<any> => {
      setError(null);
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_OPENWEATHERMAP_URL}?units=metric&lat=${
            geoCoordinates.lat
          }&lon=${geoCoordinates.long}&appid=${
            import.meta.env.VITE_OPENWEATHERMAP_API_KEY
          }`
        );
        const data = await response.json();

        setLoading(false);
        return data;
      } catch (error) {
        setError(error);
        setLoading(false);
        return null;
      }
    };

    (async function () {
      const data = await fetchWeather();
      if (!data) return;

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
    })();
  }, [geoCoordinates]);

  useEffect(() => {
    const interval = setInterval(countAndGetCurrentDate, 10000);
    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    // /random?size=1
    const fetchQuote = async (): Promise<Quote | null> => {
      try {
        // set loading true
        // set error to false
        // set loading to false
        const response = await fetch(
          `${import.meta.env.VITE_QUOTABLE_API_URL}/random?size=1`
        );
        const data = response.json();
        return data;
      } catch (error) {
        // set loading to false
        // set error to true
        return null;
      }
    };

    (async function () {
      const data: Quote | null = await fetchQuote();
      if (!data) return;

      console.log(new Date());
      setQuote(data);
    })();
  }, [count]);

  function countAndGetCurrentDate(): void {
    setCount(count + 1);
    setCurrentDateTime(getFormattedDateTime(new Date()));
  }

  return (
    <main className="w-full h-screen bg-no-repeat bg-cover bg-center bg-fixed	bg-#82C3EC color-white grid grid-cols-3 p-4">
      <p className="col-span-2">Jen Chen</p>
      <div className="justify-self-end">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error!!!</p>
        ) : (
          temperature && (
            <WeatherBlock
              weatherIconURL={weatherIconURL}
              temperatureCurrent={temperature.current}
              temperatureMin={temperature.min}
              temperatureMax={temperature.max}
            />
          )
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
      <h2 className="justify-self-center self-center text-md md:text-2xl lg:text-3xl">
        {/* fix the height add change quote smooth transition */}
        {quote && (
          <>
            <p>{quote.content}</p>
            <p className="text-base text-end">
              <span>&mdash; </span>
              {quote.author}
            </p>
          </>
        )}
      </h2>
      <div className="self-end justify-self-end">Todo</div>
    </main>
  );
}

export default App;
