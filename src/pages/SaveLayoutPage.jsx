import React from 'react';
import { useLayout } from '../hooks/useLayout';
import NavBar from '../components/NavBar';

const SaveLayoutPage = () => {
    const { modules, saveLayout } = useLayout();

    const handleSave = () => {
        saveLayout(modules.map(m => m.ModuleName));
    };

    return (
        <div className="container mx-auto p-4">
            <NavBar />
            <h2 className="text-2xl font-bold mb-4">Save Layout</h2>
            <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
                Save Layout
            </button>
        </div>
    );
};

export default SaveLayoutPage;