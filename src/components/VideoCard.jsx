import React from "react";

// For abbreviating large numbers (views)
import { abbreviateNumber } from "js-abbreviation-number";

// Link to navigate to the video page
import { Link } from "react-router-dom";

// Verified badge icon for author
import { BsFillCheckCircleFill } from "react-icons/bs";

// Component to show video length
import VideoLength from "../shared/videoLength";

const VideoCard = ({video}) => {
    return (
        // Link to navigate to the detailed video page using videoId
        <Link to={`/video/${video?.videoId}`}>
            <div className="flex flex-col mb-8">
                <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
                    <img 
                        src={video?.thumbnails[0]?.url} 
                        className="h-full w-full object-cover" 
                        alt="thumbnail" 
                    />
                    {
                        // Display video length if available
                        video?.lengthSeconds &&
                            <VideoLength time={video?.lengthSeconds} />
                    }
                </div>
                <div className="flex yext-white mt-3">
                    <div className="flex items-start">
                        <div className="flex h-9 w-9 rounded-full overflow-hidden">
                            <img
                                src={video?.author?.avatar[0]?.url}
                                className="h-full w-full object-cover"
                                alt="author"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col ml-3 overflow-hidden">
                        <span className="text-sm font-bold line-clamp-2 text-white">
                            {video?.title}
                        </span>
                        <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                            {video?.author?.title}
                            {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            )}
                        </span>
                        <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                            <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
                            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">.</span>
                            <span className="truncate">{video?.publishedTimeText?.runTime}"</span>
                        </div>  
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard