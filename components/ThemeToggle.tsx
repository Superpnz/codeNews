"use client";

import { useTheme } from "next-themes";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <button className="theme-toggle" type="button" onClick={toggleTheme}>
            <span className="theme-toggle__to-light">Светлая тема</span>
            <span className="theme-toggle__to-dark">Тёмная тема</span>
        </button>
    );
};

export default ThemeToggle;
