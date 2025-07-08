import { useState, useEffect } from 'react';
import { setLanguage } from '../services/api';

export const useLanguage = () => {
    const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en-US');

    const changeLanguage = async (newLang) => {
        try {
            await setLanguage(newLang);
            setLanguage(newLang);
            localStorage.setItem('lang', newLang);
            window.location.reload();
        } catch (err) {
            console.error('Error changing language:', err);
        }
    };

    return { language, changeLanguage };
};