import React, { useEffect, useState } from 'react';

const SlidesModule = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        setSlides(window.appData?.slides || []);
    }, []);

    const carouselId = `slideCarousel-${Math.random().toString(36).substring(2, 15)}`;

    return (
        <div>
            <h3 className="text-xl font-bold mb-2">{window.appData?.translations?.Slides || 'Slides'}</h3>
            {slides.length > 0 ? (
                <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {slides.map((slide, idx) => (
                            <div key={slide.Id} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                                <img src={slide.ImageUrl} className="d-block w-full" alt={slide.Title} />
                                <div className="carousel-caption hidden md:block">
                                    <h5>{slide.Title}</h5>
                                    <p>{slide.Description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            ) : (
                <p>{window.appData?.translations?.NoSlidesAvailable || 'No slides available'}</p>
            )}
        </div>
    );
};

export default SlidesModule;