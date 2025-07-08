import React from 'react';
import { useLayout } from '../hooks/useLayout';
import NavBar from '../components/NavBar';
import ModuleItem from '../components/ModuleItem';

const HomePage = () => {
    const { modules, moveModule } = useLayout();

    return (
        <div className="container mx-auto p-4">
            <NavBar />
            <div className="space-y-4">
                {modules.length > 0 ? (
                    modules.map((module, index) => (
                        <ModuleItem key={module.Id} module={module} index={index} moveModule={moveModule} />
                    ))
                ) : (
                    <p>No modules available</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;