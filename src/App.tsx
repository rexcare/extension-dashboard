import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { getFormattedDateTime, getGeolocationCoordinates } from "./helper";
import { GEOCoordinates } from "./types";

function App() {
  const [count, setCount] = useState<number>(0);
  const [currentDateTime, setCurrentDateTime] = useState<string>(
    getFormattedDateTime(new Date())
  );
  const [geoCoordinates, setGeoCoordinates] = useState<GEOCoordinates | null>(
    null
  );

  useEffect(() => {
    if (!geoCoordinates) return;
    fetch(
      `${import.meta.env.VITE_OPENWEATHERMAP_URL}?lat=${
        geoCoordinates.lat
      }&lon=${geoCoordinates.long}&appid=${
        import.meta.env.VITE_OPENWEATHERMAP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, [geoCoordinates]);

  useEffect(() => {
    const interval = setInterval(countAndGetCurrentDate, 1000);
    return () => clearInterval(interval);
  }, [count]);

  function countAndGetCurrentDate(): void {
    setCount(count + 1);
    setCurrentDateTime(getFormattedDateTime(new Date()));
  }

  function getLocation() {
    getGeolocationCoordinates().then((data) => setGeoCoordinates(data));
  }

  return (
    <main className="w-full h-screen bg-no-repeat bg-cover bg-center bg-fixed	bg-#82C3EC color-white grid grid-cols-3">
      <p className="col-span-2">Jen Chen</p>
      <div className="justify-self-end">Weather and City</div>
      <h1 className="col-span-3 justify-self-center text-3xl md:text-6xl lg:text-8xl">
        {currentDateTime}
      </h1>
      <div className="self-end" onClick={getLocation}>
        Location
      </div>
      <h2 className="justify-self-center self-center text-md md:text-3xl lg:text-4xl">
        Main focus
      </h2>
      <div className="self-end justify-self-end">Todo</div>
    </main>
  );
}

export default App;
