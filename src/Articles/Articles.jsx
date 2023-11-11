/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ThemeContext } from "../Theme/ThemeContext";

import { Link } from "react-router-dom";

function Articles({ flags, name, population, region, capital }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <Link to={`/${name.common}`}>
        <main
          className={`w-full md:w-10/12 lg:w-11/12 h-full xl:w-11/12 ${
            darkMode ? "bg-slate-800" : "bg-gray-100"
          } mx-auto mt-10 rounded-md shadow-lg`}
        >
          <section>
            <img
              src={flags.png || flags.svg}
              alt={flags.alt}
              className="w-full rounded-tl-md rounded-tr-md"
            />
          </section>
          <section className="px-4">
            <section className="py-4">
              <p
                className={`${
                  darkMode ? "text-gray-200" : "text-black"
                } font-bold`}
              >
                {name.common}
              </p>
            </section>
            <section className="flex flex-col gap-1 py-4">
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-black font-semibold"
                }`}
              >
                Population:{" "}
                <span
                  className={`${
                    darkMode ? "text-gray-300" : "text-black"
                  } font-light`}
                >
                  {population}
                </span>
              </p>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-black font-semibold"
                }`}
              >
                Region:{" "}
                <span
                  className={`${
                    darkMode ? "text-gray-300" : "text-black"
                  } font-light`}
                >
                  {region}
                </span>
              </p>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-black font-semibold"
                } `}
              >
                Capital:{" "}
                <span
                  className={`${
                    darkMode ? "text-gray-300" : "text-black"
                  } font-light`}
                >
                  {capital}
                </span>
              </p>
            </section>
          </section>
        </main>
      </Link>
    </>
  );
}

export default Articles;
