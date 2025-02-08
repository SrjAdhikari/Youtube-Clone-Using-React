import axios from "axios";

// Base URL of the YouTube API
const BASE_URL = "https://youtube138.p.rapidapi.com";

// Fetch options including query parameters and API headers
const options = {
    params: {
        hl: 'en',       // Language parameter (English)
        gl: 'US'        // Geolocation parameter (United States)
    },
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_YOUTUBE_API_KEY, 
        'x-rapidapi-host': 'youtube138.p.rapidapi.com'
    }
};


// Function to fetch data from the API
export const fetchDataFromApi = async (url) => {
    try {
        // Making GET request to API
        const { data } = await axios.get(`${BASE_URL}/${url}`, options);
        return data;
    } 
    catch (error) {
        // Handling API errors and logging for debugging
        console.error("API Error:", error.response?.data || error.message);
        return null;    // Returning null in case of an error to prevent crashes
    }
};