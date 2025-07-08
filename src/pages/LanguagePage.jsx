import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import NavBar from '../components/NavBar';

const LanguagePage = () => {
    const { language, changeLanguage } = useLanguage();

    return (
        <div className="container mx-auto p-4">
            <NavBar />
            <h2 className="text-2xl font-bold mb-4">Change Language</h2>
            <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={language}
                className="border p-2 rounded"
            >
                <option value="en-US">English</option>
                <option value="vi-VN">Tiếng Việt</option>
            </select>
        </div>
    );
};

export default LanguagePage;