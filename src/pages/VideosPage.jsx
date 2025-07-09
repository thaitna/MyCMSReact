import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideosPage = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://localhost:7290/api/videos/list', {
                    headers: { 'Accept-Language': localStorage.getItem('lang') || 'en-US' },
                });
                setVideos(response.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    if (loading) return <div className="container mx-auto p-4">Loading...</div>;
    if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Videos</h2>
            {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.map((video) => (
                        <div key={video.id} className="bg-gray-100 p-2 rounded">
                            <iframe src={video.videoUrl} className="w-full h-40" allowFullScreen></iframe>
                            <p>{video.title}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No videos available.</p>
            )}
        </div>
    );
};

export default VideosPage;