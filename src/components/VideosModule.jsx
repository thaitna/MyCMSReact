import React, { useEffect, useState } from 'react';

const VideosModule = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        setVideos(window.appData?.videos || []);
    }, []);

    return (
        <div>
            <h3 className="text-xl font-bold mb-2">{window.appData?.translations?.Videos || 'Videos'}</h3>
            {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.map((video) => (
                        <div key={video.Id} className="bg-gray-100 p-4 rounded">
                            <h5 className="text-lg font-semibold">{video.Title}</h5>
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe src={video.VideoUrl} className="w-full h-full" allowFullScreen></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>{window.appData?.translations?.NoVideosAvailable || 'No videos available'}</p>
            )}
        </div>
    );
};

export default VideosModule;