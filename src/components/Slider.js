import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';



import {getUpcomingMovie } from "../api";

library.add(faChevronLeft);
const MovieSlider = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch upcoming movie data here and set it using setMovies
        getUpcomingMovie().then(result => setMovies(result));
    }, []); // Add any dependencies for the useEffect hook

    const customPrevArrow = (clickHandler, hasPrev, label) => (
        <button type="button" onClick={clickHandler} title={label} style={{ border:"none",position: 'absolute', zIndex: 2, left: 15, top: '50%', cursor: 'pointer', background: 'rgba(255,255,255,0.5)', outline:"none", borderRadius:"100px", padding:"8px 18px 12px" }}>
         <FontAwesomeIcon icon={faChevronLeft} style={{ color: 'black', fontSize: '16px' }} />

        </button>
      );
    
      const customNextArrow = (clickHandler, hasNext, label) => (
        <button type="button" onClick={clickHandler} title={label} style={{ border:"none",position: 'absolute', zIndex: 2, right: 15, top: '50%', cursor: 'pointer', background: 'rgba(255,255,255,0.5)', outline:"none", borderRadius:"100px", padding:"8px 18px 12px" }}>
            <FontAwesomeIcon icon={faChevronRight} style={{ color: 'black', fontSize: '16px' }} />
        </button>
      );

    return (
        <Carousel infiniteLoop
        renderArrowPrev={customPrevArrow}
        renderArrowNext={customNextArrow}
        >
            {movies.slice(0,5).map((movie, i) => (
                <div key={i}>
                    <div className='overlay'></div>
                    <img src={`${process.env.REACT_APP_BASEIMGURL}${movie.backdrop_path}`} alt={`Movie ${i}`} />
                    <div className='container thumb-container'>
                        <div className='thumbnail'>
                            <h1 className='mb-4'>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <div className="movie-rate" style={{fontWeight:"bold"}}>Rating : {movie.vote_average.toFixed(1)}</div>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default MovieSlider;