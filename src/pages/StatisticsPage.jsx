import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatisticsPage = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('https://localhost:7290/api/statistics/get', {
                    headers: { 'Accept-Language': localStorage.getItem('lang') || 'en-US' },
                });
                setStats(response.data || {});
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStatistics();
    }, []);

    if (loading) return <div className="container mx-auto p-4">Loading...</div>;
    if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 p-4 rounded text-center">
                    <h5 className="font-semibold">Posts</h5>
                    <p>{stats.postCount || 0}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded text-center">
                    <h5 className="font-semibold">Exam Results</h5>
                    <p>{stats.examResultCount || 0}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded text-center">
                    <h5 className="font-semibold">Slides</h5>
                    <p>{stats.slideCount || 0}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded text-center">
                    <h5 className="font-semibold">Videos</h5>
                    <p>{stats.videoCount || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;