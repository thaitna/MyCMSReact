import React, { useEffect, useState } from 'react';
import api from '../services/api';

const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await api.get('/api/links/list');
                setLinks(response.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLinks();
    }, []);

    if (loading) return <div className="container mx-auto p-4">Loading...</div>;
    if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Links</h2>
            {links.length > 0 ? (
                <ul className="list-disc pl-5">
                    {links.map((link) => (
                        <li key={link.id} className="mb-2">
                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No links available.</p>
            )}
        </div>
    );
};

export default LinksPage;