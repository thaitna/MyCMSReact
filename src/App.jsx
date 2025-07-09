import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import LinksPage from './pages/LinksPage';
import SlidesPage from './pages/SlidesPage';
import VideosPage from './pages/VideosPage';
import StatisticsPage from './pages/StatisticsPage';
import NavBar from './components/NavBar';

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <NavBar />
                <main className="container mx-auto p-4 mt-4">
                    <Routes key={window.location.pathname}>
                        <Route path="/posts" element={<PostsPage />} />
                        <Route path="/links" element={<LinksPage />} />
                        <Route path="/slides" element={<SlidesPage />} />
                        <Route path="/videos" element={<VideosPage />} />
                        <Route path="/statistics" element={<StatisticsPage />} />
                    </Routes>
                </main>
            </Router>
        </DndProvider>
    );
};

export default App;