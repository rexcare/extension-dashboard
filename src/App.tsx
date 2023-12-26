import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { getFormattedDateTime, getGeolocation } from "./helper";

function App() {
  const [count, setCount] = useState<number>(0);
  const [currentDateTime, setCurrentDateTime] = useState<string>(
    getFormattedDateTime(new Date())
  );

  useEffect(() => {
    const interval = setInterval(countAndGetCurrentDate, 1000);
    return () => clearInterval(interval);
  }, [count]);

  function countAndGetCurrentDate(): void {
    setCount(count + 1);
    setCurrentDateTime(getFormattedDateTime(new Date()));
  }

  function getLocation() {
    const location: GeolocationCoordinates | undefined = getGeolocation();
    console.log(location && JSON.stringify(location));
  }

  return (
    <main className="w-full h-screen bg-no-repeat bg-cover bg-center bg-fixed	bg-#82C3EC color-white grid grid-cols-3">
      <p className="col-span-2">Jen Chen</p>
      <div className="justify-self-end">Weather</div>
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
