import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// Importing utility functions and components
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {

    // State to store search results
    const [result, setResult] = useState();

    // Extracting the search query from URL params
    const { searchQuery } = useParams();

    // Context to manage loading state
    const { setLoading } = useContext(Context);

    // useEffect hook to fetch data whenever the search query changes
    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
        fetchSearchResults();
    }, [searchQuery]);

    // Function to fetch search results from the API
    const fetchSearchResults = () => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${searchQuery}`)
            .then((response) => {
                setResult(response?.contents);
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-row h-[calc(100%-56px)]">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 gap-2 p-5">
                    {
                        // Render video cards for search results
                        result?.map((item) => {
                            if (item?.type !== "video") return false;
                            return (
                                <SearchResultVideoCard 
                                    key={item?.video?.videoId}
                                    video={item?.video}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchResult