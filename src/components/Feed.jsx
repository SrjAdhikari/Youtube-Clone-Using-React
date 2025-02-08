import React, { useContext, useEffect } from 'react'
import { Context } from '../context/contextApi'
import VideoCard from './VideoCard'
import LeftNav from './LeftNav'

const Feed = () => {
    // Extracting loading state and search results from the global context
    const {loading, searchResults} = useContext(Context);

    // Ensuring the root container does not have custom height on component mount
    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
    }, []);

    return (
        <div className='flex flex-row h-[calc(100%-56px)]'>
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {
                        // Display video cards when not loading and search results exist
                        !loading && 
                        Array.isArray(searchResults) && searchResults.map(item => {
                            // Render only video-type items
                            if (item?.type !== "video") return null;
                            return (
                                <VideoCard 
                                    key={item?.video?.videoId} 
                                    video={item?.video}             // Pass video data to VideoCard component
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Feed