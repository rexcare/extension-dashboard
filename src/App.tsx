// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <main className="w-full h-screen bg-no-repeat bg-cover bg-center bg-fixed	bg-#82C3EC color-white grid grid-cols-3">
      <p className="col-span-2">Jen Chen</p>
      <div className="justify-self-end">Weather</div>
      <p className="col-span-3 justify-self-center">Current time</p>
      <div className="self-end">Location</div>
      <div className="justify-self-center self-center">Main focus</div>
      <div className="self-end justify-self-end">Todo</div>
    </main>
  );
}

export default App;
