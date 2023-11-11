/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ThemeContext } from "../Theme/ThemeContext";
import { BsArrowLeft } from "react-icons/bs";

function CountryDetails() {
  const [country, setCountry] = useState({});
  const { name } = useParams();
  const [borderingCountries, setBorderingCountries] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (res.ok) {
          const data = await res.json();
          setCountry(data[0]);

          const borderPromises = (data[0].borders || []).map((border) =>
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          );
          const borderResponses = await Promise.all(borderPromises);
          const borderCountries = await Promise.all(
            borderResponses.map((response) => response.json())
          );
          setBorderingCountries(borderCountries);
        } else {
          console.error(`Request failed with status: ${res.status}`);
          setCountry(null);
        }
      } catch (error) {
        console.error(error);
        setCountry(null);
      }
    };
    getCountryDetails();
  }, [name]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div />
          </Transition.Child>

          <div className="fixed inset-0  z-10 w-screen  ">
            <div className="flex w-full mt-12 md:mt-8  items-end justify-center  text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={`relative transform overflow-hidden  ${
                    darkMode ? "bg-slate-800 h-screen" : "bg-white h-screen"
                  } text-left  transition-all sm:my-8 sm:w-full sm:max-w-lgm md:w-full md:px-5`}
                >
                  <div
                    className={` flex flex-col  bg-gray-50 px-4 py-3 sm:flex  ${
                      darkMode ? "bg-slate-800" : ""
                    }`}
                  >
                    <Link to="/">
                      <button
                        type="button"
                        className={`mt-3  inline-flex w-1/3 items-center gap-2 justify-center rounded-md ${
                          darkMode
                            ? "bg-slate-700 text-gray-100 "
                            : "bg-white text-gray-900 "
                        } px-3 py-2 text-sm font-semibold  shadow-sm  hover:bg-gray-50 sm:mt-0 sm:w-auto `}
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        <span>
                          <BsArrowLeft
                            className={`${
                              darkMode ? "text-white" : "text-black"
                            }`}
                          />
                        </span>
                        Back
                      </button>
                    </Link>
                  </div>

                  <div
                    className={`mt-2 flex flex-col lg:flex-row lg:gap-8 ${
                      darkMode ? "bg-slate-800" : ""
                    }`}
                  >
                    <section className="px-4 lg:w-1/2">
                      <img
                        src={country.flags?.svg || country.flags?.png}
                        alt={country.common?.name}
                        className="rounded-tl-md rounded-md lg:h-64 lg:w-full xl:h-64 lg:mt-10 "
                      />
                    </section>
                    <section className="px-4">
                      <section className="text-left mt-10">
                        <p
                          className={`${
                            darkMode ? "text-gray-200" : "text-black"
                          } font-bold `}
                        >
                          {country.name?.common}
                        </p>
                      </section>
                      <section className="flex flex-col items-start gap-1 py-4">
                        <p
                          className={`${
                            darkMode ? "text-white" : "text-black font-semibold"
                          }`}
                        >
                          Native Name:{" "}
                          <span
                            className={`${
                              darkMode ? "text-gray-300" : "text-black"
                            } font-light`}
                          >
                            {country?.name?.official}
                          </span>
                        </p>
                        <p
                          className={`${
                            darkMode ? "text-white" : "text-black font-semibold"
                          }`}
                        >
                          Population:{" "}
                          <span
                            className={`${
                              darkMode ? "text-gray-300" : "text-black"
                            } font-light`}
                          >
                            {country.population}
                          </span>
                        </p>
                        <p
                          className={`${
                            darkMode ? "text-white" : "text-black font-semibold"
                          }`}
                        >
                          Region:{" "}
                          <span
                            className={`${
                              darkMode ? "text-gray-300" : "text-black"
                            } font-light`}
                          >
                            {country.region}
                          </span>
                        </p>
                        <p
                          className={`${
                            darkMode ? "text-white" : "text-black font-semibold"
                          }`}
                        >
                          Sub Region:{" "}
                          <span
                            className={`${
                              darkMode ? "text-gray-300" : "text-black"
                            } font-light`}
                          >
                            {country.subregion || "Not Available"}
                          </span>
                        </p>
                        <p
                          className={`${
                            darkMode ? "text-white" : "text-black font-semibold"
                          } `}
                        >
                          Capital:{" "}
                          <span
                            className={`${
                              darkMode ? "text-gray-300" : "text-black"
                            } font-light`}
                          >
                            {country.capital || "Not Available"}
                          </span>
                        </p>
                      </section>
                    </section>
                    {/* SECOND SECTION */}
                    <section className="flex flex-col  gap-1 py-4 px-4 items-start lg:mt-16">
                      <p
                        className={`${
                          darkMode ? "text-white" : "text-black font-semibold"
                        }`}
                      >
                        Top Level Domain:{" "}
                        <span
                          className={`${
                            darkMode ? "text-gray-300" : "text-black"
                          } font-light`}
                        >
                          {country.tld || "Not Available"}
                        </span>
                      </p>
                      {country.currencies &&
                        Object.keys(country.currencies).map(
                          (currencyCode, index) => (
                            <div key={index}>
                              <p
                                className={`${
                                  darkMode
                                    ? "text-white"
                                    : "text-black font-semibold"
                                }`}
                              >
                                Currency :{" "}
                                <span
                                  className={`${
                                    darkMode ? "text-gray-300" : "text-black"
                                  } font-light`}
                                >
                                  {country.currencies[currencyCode]?.name}
                                </span>
                              </p>
                            </div>
                          )
                        )}
                      {country.languages &&
                        Object.keys(country.languages).map(
                          (languageCode, index) => (
                            <div key={index}>
                              <p
                                className={`${
                                  darkMode
                                    ? "text-white"
                                    : "text-black font-semibold"
                                }`}
                              >
                                Language :{" "}
                                <span
                                  className={`${
                                    darkMode ? "text-gray-300" : "text-black"
                                  } font-light`}
                                >
                                  {country.languages[languageCode]}
                                </span>
                              </p>
                            </div>
                          )
                        )}
                    </section>
                  </div>
                  {country.borders && country.borders.length > 0 && (
                    <div className="mt-8 h-screen flex flex-col items-start px-4 lg:flex-row lg:gap-2  lg:absolute lg:left-1/2 lg:top-72 lg:mt-10 lg:-ml-4 xl:ml-10 xl:top-72">
                      <p
                        className={`whitespace-nowrap lg:py-2  ${
                          darkMode
                            ? "text-white font-semibold"
                            : "text-black font-semibold"
                        }`}
                      >
                        Border Countries:
                      </p>
                      <div className="flex flex-wrap lg:items-center gap-4 mt-2">
                        {country.borders.map((borderCountryCode, index) => (
                          <button
                            key={index}
                            className={`w-20 rounded-md ${
                              darkMode ? "bg-slate-700 text-white" : "bg-white"
                            } shadow-md`}
                          >
                            {borderCountryCode}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default CountryDetails;
