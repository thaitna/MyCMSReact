import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const NavBar = () => {
    const { language, changeLanguage } = useLanguage();

    return (
        <nav className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded">
            <h1 className="text-2xl font-bold">{window.appData?.translations?.Home || 'Home'}</h1>
            <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={language}
                className="border p-2 rounded"
            >
                <option value="en-US">English</option>
                <option value="vi-VN">Tiếng Việt</option>
            </select>
        </nav>
    );
};

export default NavBar;