import React from 'react';
import { useLayout } from '../hooks/useLayout';
import NavBar from '../components/NavBar';

const SaveLayoutPage = () => {
    const { modules, saveLayout } = useLayout();

    const handleSave = () => {
        if (modules.length > 0) {
            saveLayout(modules.map(m => m.ModuleName));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <NavBar />
            <h2 className="text-2xl font-bold mb-4">Save Layout</h2>
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
                disabled={modules.length === 0}
            >
                Save Layout
            </button>
            {modules.length === 0 && <p className="text-red-500 mt-2">No modules to save.</p>}
        </div>
    );
};

export default SaveLayoutPage;