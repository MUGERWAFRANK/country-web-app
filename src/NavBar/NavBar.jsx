import { useContext } from "react";
import { ThemeContext } from "../Theme/ThemeContext";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
const NavBar = () => {
  const { darkMode, enableDarkMode } = useContext(ThemeContext);
  return (
    <main
      className={`flex justify-between items-center ${
        darkMode ? "bg-var(--dark-blue)" : "bg-gray-100"
      } px-8 h-16 shadow-md xl:px-12`}
    >
      <section>
        <p
          className={`text-xs xl:text-lg font-bold ${
            darkMode ? "text-gray-300" : ""
          }`}
        >
          Where in the world?
        </p>
      </section>
      <section>
        {!darkMode ? (
          <section className="flex gap-2">
            <BsMoonStarsFill
              className="cursor-pointer xl:w-7 xl:h-7"
              onClick={enableDarkMode}
            />{" "}
            <p className=" text-gray-900 font-mono text-sm xl:text-lg tracking-wider">
              Dark Mode
            </p>
          </section>
        ) : (
          <section className="flex gap-2">
            <BsFillSunFill
              className="cursor-pointer text-white xl:w-7 xl:h-7"
              onClick={enableDarkMode}
            />
            <p className=" text-gray-300 font-mono text-sm xl:text-lg tracking-wider">
              Light Mode
            </p>
          </section>
        )}
      </section>
    </main>
  );
};
export default NavBar;
