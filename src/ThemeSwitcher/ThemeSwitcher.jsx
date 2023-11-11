import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="mx-auto sm:max-w-375px md:max-w-768px lg:max-w-1440px px-3 text-black-600 flex justify-between cursor-pointer">
      <button onClick={toggleTheme} className="text-black dark:text-white">
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>
      <div className="ml-3 text-black dark:text-white">
        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
