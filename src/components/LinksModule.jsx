import React, { useEffect, useState } from 'react';

const LinksModule = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        setLinks(window.appData?.links || []);
    }, []);

    return (
        <div>
            <h3 className="text-xl font-bold mb-2">{window.appData?.translations?.Links || 'Links'}</h3>
            {links.length > 0 ? (
                <ul className="list-group">
                    {links.map((link) => (
                        <li key={link.Id} className="list-group-item">
                            <a href={link.Url} target="_blank" rel="noopener noreferrer">{link.Title}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{window.appData?.translations?.NoLinksAvailable || 'No links available'}</p>
            )}
        </div>
    );
};

export default LinksModule;