import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// Player component for YouTube videos
import ReactPlayer from "react-player/youtube";

// Verified badge for channel
import { BsFillCheckCircleFill } from "react-icons/bs";

// Like icon
import { AiOutlineLike } from "react-icons/ai";

// To abbreviate large numbers like views and likes
import { abbreviateNumber } from "js-abbreviation-number";

// API utility for fetching data
import { fetchDataFromApi } from "../utils/api";

// Context to manage loading state
import { Context } from "../context/contextApi";

// Card component for showing related videos
import SuggestionVideoCard from "./SuggestionVideoCard";

const VideoDetails = () => {

    const [video, setVideo] = useState();
    const [relatedVideos, setRelatedVideos] = useState();

    // Get the video ID from URL params
    const { id } = useParams();

    // Context to handle loading state
    const { setLoading } = useContext(Context);

    useEffect(() => {
        document.getElementById("root").classList.add("custom-h");
        fetchVideoDetails();
        fetchRelatedVideos();
    }, [id]);

    // Fetch video details from the API
    const fetchVideoDetails = () => {
        setLoading(true);
        fetchDataFromApi(`video/details/?id=${id}`)
            .then((response) => {
                setVideo(response);
                setLoading(false);
            });
    };

    // Fetch related videos based on the video ID
    const fetchRelatedVideos = () => {
        fetchDataFromApi(`video/related-contents/?id=${id}`)
            .then((response) => {
                setRelatedVideos(response);
                setLoading(false);
            });
    };

    return (
        <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            controls
                            width="100%"
                            height="100%"
                            style={{ backgroundColor: "black" }}
                            playing={true}
                        />
                    </div>
                    <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                        {video?.title}
                    </div>
                    <div className="flex justify-between flex-col md:flex-row mt-4">
                        <div className="flex">
                            <div className="flex items-start">
                                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                                    <img
                                        src={`videos/${video?.author?.avatar[0]?.url}`}
                                        className="h-full w-full object-cover"
                                        alt="author"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-3">
                                <div className="text-white text-md font-semibold flex items-center">
                                    {video?.author?.title}
                                    {video?.author?.badges[0]?.type ===
                                        "VERIFIED_CHANNEL" && (
                                        <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                                    )}
                                </div>
                                <div className="text-white/[0.7] text-sm">
                                    {video?.author?.stats?.subscribersText}
                                </div>
                            </div>
                        </div>
                        <div className="flex text-white mt-4 md:mt-0">
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                                <AiOutlineLike className="text-white text-xl mr-2" />
                                <span>
                                    {`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}
                                </span>
                            </div>
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                                {/* <AiOutlineLike className="text-white text-xl mr-2" /> */}
                                <span>
                                    {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                    {
                        // Render related video cards
                        relatedVideos?.contents?.map((item, index) => {
                            if(item?.type !== "video") return null;
                            return (
                                <SuggestionVideoCard key={index} video={item?.video} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default VideoDetails