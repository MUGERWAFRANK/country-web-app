import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Countries from "./Countries/Countries";
import CountryDetails from "./CountryDetails/CountryDetails";
import Error from "./Error/Error";
import NavBar from "./NavBar/NavBar";
import { ThemeContext } from "./Theme/ThemeContext";

function App() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <main className={darkMode ? "dark-Mode h-full" : "h-full bg-gray-200"}>
        <div>
          <NavBar />
        </div>

        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/:name" element={<CountryDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
