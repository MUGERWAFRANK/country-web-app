import { useContext } from "react";
import { CountryContext } from "./Articles/Articles";
import CountryCard from "./Countries/Countries";

const CountryList = () => {
  const { countries, region, search } = useContext(CountryContext);

  const filteredCountries = countries.filter(
    (country) =>
      country.region.includes(region) &&
      country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">
      {filteredCountries.map((country) => (
        <CountryCard key={country.cca2} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
