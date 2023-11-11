import { useState, useEffect } from "react";
import Article from "../Articles/Articles";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCountries();
  }, []);

  const searchCountries = (query) => {
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    if (results.length === 0) {
      setError("No such country");
    } else {
      setError(null);
    }
    setFilteredCountries(results);
  };

  const filterByRegion = (region) => {
    if (region === "") {
      setFilteredCountries(countries);
    } else {
      const results = countries.filter((country) => country.region === region);
      setFilteredCountries(results);
    }
  };

  return (
    <>
      {error ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-center">{error}</h1>
        </div>
      ) : !countries ? (
        <h1 className="text-gray-800 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">
          Loading...
        </h1>
      ) : (
        <section className="mx-auto px-8">
          <div className="flex justify-between flex-col gap-4 ">
            <div className="w-full lg:w-1/2 items-start lg:-ml-10">
              <SearchBar onSearch={searchCountries} countries={countries} />
            </div>
            <div className="w-1/2">
              <Filters
                onSearch={searchCountries}
                onFilterByRegion={filterByRegion}
                countries={countries}
              />
            </div>
          </div>

          <div className="grid grid-cols-1  gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-2">
            {filteredCountries.map((country) => (
              <Article key={country.name.common} {...country} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Countries;
