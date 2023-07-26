import { useState } from "react";
import "./App.css";
import RegionSelector from "./components/regionSelector";
import Home from "./pages/Home";

function App() {
  const [value, setValue] = useState(["two", "three", "four"]);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
