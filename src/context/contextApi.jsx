import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";

// Creating a Context for global state management
export const Context = createContext();

export const AppContext = ({ children }) => {
    // State variables to manage loading, search results, selected categories, and mobile menu
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    // Fetch data when the selected category changes
    useEffect(() => {
        fetchInitialData(selectedCategories);
    }, [selectedCategories]);

    // Function to fetch search results from API based on category
    const fetchInitialData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
            console.log(contents);
            setSearchResults(contents);
            setLoading(false);
        });
    };

    return (
        // Providing global state to all components
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                selectedCategories,
                setSelectedCategories,
                mobileMenu,
                setMobileMenu,
            }}
        >
            {children}
        </Context.Provider>
    )
}