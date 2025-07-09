import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const NavBar = () => {
    const { language, changeLanguage } = useLanguage();

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <div className="space-x-4">
                <NavLink
                    to="/posts"
                    className={({ isActive }) =>
                        `hover:text-gray-300 ${isActive ? 'text-yellow-400' : 'text-white'} p-2`
                    }
                >
                    Posts
                </NavLink>
                <NavLink
                    to="/links"
                    className={({ isActive }) =>
                        `hover:text-gray-300 ${isActive ? 'text-yellow-400' : 'text-white'} p-2`
                    }
                >
                    Links
                </NavLink>
                <NavLink
                    to="/slides"
                    className={({ isActive }) =>
                        `hover:text-gray-300 ${isActive ? 'text-yellow-400' : 'text-white'} p-2`
                    }
                >
                    Slides
                </NavLink>
                <NavLink
                    to="/videos"
                    className={({ isActive }) =>
                        `hover:text-gray-300 ${isActive ? 'text-yellow-400' : 'text-white'} p-2`
                    }
                >
                    Videos
                </NavLink>
                <NavLink
                    to="/statistics"
                    className={({ isActive }) =>
                        `hover:text-gray-300 ${isActive ? 'text-yellow-400' : 'text-white'} p-2`
                    }
                >
                    Statistics
                </NavLink>
            </div>
            <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={language}
                className="border p-2 rounded text-black"
            >
                <option value="en-US">English</option>
                <option value="vi-VN">Tiếng Việt</option>
            </select>
        </nav>
    );
};

export default NavBar;