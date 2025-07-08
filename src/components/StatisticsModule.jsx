import React, { useEffect, useState } from 'react';

const StatisticsModule = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        setStats(window.appData?.statistics || {});
    }, []);

    return (
        <div>
            <h3 className="text-xl font-bold mb-2">{window.appData?.translations?.Statistics || 'Statistics'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 p-4 rounded text-center">
                    <h5 className="font-semibold">{window.appData?.translations?.PostCount || 'Number of Posts'}</h5>
                    <p>{stats.PostCount || 0}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded text-center">
                    <h5 className="font-semibold">{window.appData?.translations?.ExamResultCount || 'Number of Exam Results'}</h5>
                    <p>{stats.ExamResultCount || 0}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded text-center">
                    <h5 className="font-semibold">{window.appData?.translations?.SlideCount || 'Number of Slides'}</h5>
                    <p>{stats.SlideCount || 0}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded text-center">
                    <h5 className="font-semibold">{window.appData?.translations?.VideoCount || 'Number of Videos'}</h5>
                    <p>{stats.VideoCount || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsModule;