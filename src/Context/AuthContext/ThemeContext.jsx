// src/contexts/ThemeContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // We will use these icons in the toggle button

// 1. Create the Context
const ThemeContext = createContext();

// 2. Custom Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// 3. The Theme Provider Component
export const ThemeProvider = ({ children }) => {
    // Initialize state from local storage or default to 'light'
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );
    
    // Effect to apply the theme class to the document root (<html> tag)
    useEffect(() => {
        const root = window.document.documentElement;
        
        // Remove previous theme state
        root.classList.remove('light', 'dark');
        root.removeAttribute('data-theme');
        
        // Apply the new theme state
        if (theme === 'dark') {
            root.classList.add('dark'); // For Tailwind CSS utility classes
            root.setAttribute('data-theme', 'dark'); // For DaisyUI component theming
        } else {
            root.classList.remove('dark');
            root.setAttribute('data-theme', 'light');
        }

        // Save preference to local storage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};