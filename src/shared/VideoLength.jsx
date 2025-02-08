import React from 'react'
import moment from 'moment'

const VideoLength = ({time}) => {
    // Convert the given time (in seconds) to an H:mm:ss format using moment.js
    const videoLengthInSeconds = moment()
                                .startOf('day')         // Start from midnight (00:00:00)
                                .seconds(time)          // Add the given time in seconds
                                .format('H:mm:ss');     // Format it as ours:Minutes:Seconds

    return (
        // Display the formatted video duration as an overlay at the bottom-right corner
        <div className='absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md'>
            {videoLengthInSeconds}
        </div>
    )
}

export default VideoLength