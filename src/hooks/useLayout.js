import { useState, useEffect } from 'react';
import { fetchLayout, saveLayout } from '../services/api';
import { useLanguage } from './useLanguage';

export const useLayout = () => {
    const [modules, setModules] = useState([]);
    const { language } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLayout = async () => {
            try {
                setIsLoading(true);
                const data = await fetchLayout(language);
                window.appData = data;
                setModules(data.modules || []);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        loadLayout();
    }, [language]);

    const moveModule = (fromIndex, toIndex) => {
        const updatedModules = [...modules];
        const [movedModule] = updatedModules.splice(fromIndex, 1);
        updatedModules.splice(toIndex, 0, movedModule);
        setModules(updatedModules);
    };

    const saveLayout = async (moduleNames) => {
        try {
            await saveLayout(moduleNames);
        } catch (err) {
            console.error('Error saving layout:', err);
        }
    };

    if (isLoading) return { modules: [], moveModule, saveLayout, isLoading, error: null };
    if (error) return { modules: [], moveModule, saveLayout, isLoading: false, error };

    return { modules, moveModule, saveLayout, isLoading: false, error: null };
};