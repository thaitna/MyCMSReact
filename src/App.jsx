import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SaveLayoutPage from './pages/SaveLayoutPage';
import LanguagePage from './pages/LanguagePage';

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/save-layout" element={<SaveLayoutPage />} />
                    <Route path="/language" element={<LanguagePage />} />
                </Routes>
            </Router>
        </DndProvider>
    );
};

export default App;