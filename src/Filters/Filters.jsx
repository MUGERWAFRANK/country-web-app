/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ThemeContext } from "../Theme/ThemeContext";

export default function Filters({ onFilterByRegion }) {
  const { darkMode } = useContext(ThemeContext);
  const regions = [
    {
      Name: "Africa",
    },
    {
      Name: "Americas",
    },
    {
      Name: "Asia",
    },
    {
      Name: "Europe",
    },
    {
      Name: "Oceania",
    },
    {
      Name: "Antarctic",
    },
  ];

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    onFilterByRegion(selectedRegion);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">
      <form className="md:flex-2">
        <select
          name="filter-by-region"
          id="filter-by-region"
          className={`inline-flex w-11/12 lg:w-full lg:p-4 lg:-mb-4 xl:w-full justify-center gap-x-1.5 rounded-md ${
            darkMode ? "bg-slate-800 text-gray-300" : "bg-white text-gray-900"
          }  px-3 py-2 text-sm font-semibold shadow-md xl:w-full xl:py-4 xl:text-lg`}
          onChange={handleRegionChange}
        >
          <option value="">Filter by Region</option>
          {regions.map((region, index) => (
            <option key={index} value={region.Name}>
              {region.Name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
