// src/Hooks/useDebounce.js 
// (Create this file in your Hooks directory)

import { useState, useEffect } from 'react';


const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up a timer to update the debounced value after the delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function: This cancels the previous timer 
        // every time 'value' changes (i.e., every keystroke). 
        // This is the core mechanism of debouncing.
        return () => {
            clearTimeout(handler);
        };
        
    }, [value, delay]); // Effect runs when value or delay changes

    return debouncedValue;
};

export default useDebounce;