
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';

import { Modal } from 'react-bootstrap';
import {getMovieList, getTopRatedMovie, getUpcomingMovie, searchMovie} from "../api"
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';


const ShowCategoryMovie = () =>{
    const [movies, setMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [show, setShow] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [noResult, setNoResult] = useState()
    const [searchResult, setSearchResult] = useState()
    const [upcomingMovie, setUpcomingMovie] = useState()
    const [filterCategory, setFilterCategory] = useState()
    const [topRatedMovie, setTopRatedMovie] = useState()
    const [page, setPage] = useState(1);
    const [disabled, setDisabled] = useState(true)
    const [showPagination, setShowPagination] = useState()
    const [loading, setLoading] = useState(false)
    

    const handleClose = () => setShow(false);
    const handleShow = (movie) => {
        setShow(true)
        setSelectedMovie(movie)

    }

    useEffect(() => {
        CategoryMovie("popular");

    }, []);

    useEffect(() => {
        CategoryMovie(filterCategory);
        console.log("Filter Category:", filterCategory);
    }, [page, filterCategory]);
    
    


    const CategoryMovie = async(category) =>{
        switch(category){
        case 'popular':
            setMovies(await getMovieList(page))
            setShowPagination(true)
            break
        case 'upcoming':
            setMovies(await getUpcomingMovie(page))
            setShowPagination(false)
            break
        case 'topRated':
            setMovies(await getTopRatedMovie(page))
            setShowPagination(true)
            break
        default:
            setMovies([])
        }
        setFilterCategory(category)
        setLoading(false); 
    }

    const MovieList = () => {
        const limitMovie = movies.slice(0,20)
        return (
        <>
            {noResult ? (
            <p>No Result</p>
            ) : (
            limitMovie.map((movie, i) => (
                <div className="movie-wrapper" key={i}>
                <img
                    className="movie-image w-100"
                    src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
                    onClick={() => handleShow(movie)}
                    alt={`Movie ${i}`}
                ></img>
                <div className="movie-title">
                    <h6 className="w-100">{movie.title}</h6>
                    <div className="movie-date">{movie.release_date}</div>
                    <div className="movie-rate">{movie.vote_average.toFixed(1)}</div>
                </div>
                </div>
            ))
            )}
        </>
        );
    };
    


    const ModalPopup = () =>{
        if (!selectedMovie) {
            return null; // or you can return a loading indicator, an error message, or an empty component
        }
        return(
        <div className='modal-movie'>
                <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title className='text-center w-100'>{selectedMovie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='modal-container'>
                <img className="w-20 img-popup" src={(`${process.env.REACT_APP_BASEIMGURL}${selectedMovie.poster_path}`)} alt={selectedMovie.title}></img>
                <div>
                <h5>Synopsis</h5>
                {selectedMovie.overview}
                </div>
            </div>

            </Modal.Body>
        </Modal>
        </div>

        )
        
    }

    

    const search = async(q) =>{
        const query = await searchMovie(q)
        if (q.length>1){
      
            setMovies(query.results)
            setSearchResult(query.results)
            setNoResult(query.results.length===0)
            setShowPagination(false)
        }
   
        if (q.length===0){
            setNoResult(false)
            setSearchResult()
            setShowPagination(true)
          
        }

        if(query.results.length === 0){
            setShowPagination(false)
            CategoryMovie(filterCategory)
        }
        

    }



    
    const nextPage = async() =>{
        const nextPageNumber = page + 1;
        setLoading(true)
        setDisabled(false)

        if (filterCategory === "popular") {
            const newMovieList = await getMovieList(nextPageNumber);
            setPage(nextPageNumber);
            setMovies((prevMovies) => [...prevMovies, ...newMovieList]);
            console.log(page);
        }
        if (filterCategory === "topRated") {
            const newMovieList = await getTopRatedMovie(nextPageNumber);
            setPage(nextPageNumber);
            setMovies((prevMovies) => [...prevMovies, ...newMovieList]);
            console.log(page);
        }
        setLoading(false)
 
    }

    const prevPage = async() =>{
        const prevPageNumber = page - 1;
        setLoading(true)
        let newMovieList
        if (prevPageNumber === 0 ){
            setDisabled(true)
            return
        }
        if (prevPageNumber === 1 ){
            setDisabled(true)
            // return
        }
        if (prevPageNumber > 1 ){
            setDisabled(false)
            // return
        }
        if (prevPageNumber > 0 ){
           
            if (filterCategory === "popular") {
                newMovieList = await getMovieList(prevPageNumber);
       
            }
            if (filterCategory === "topRated") {
                newMovieList = await getTopRatedMovie(prevPageNumber);
    
            }
                 
        setPage(prevPageNumber);
        setMovies((prevMovies) => [...prevMovies, ...newMovieList]);
   
        }
        setLoading(false)

   
   
 
    }



    return (
        <div className="App">
        <header className="App-header">
            <div className='container'>
            <div className='filter-container'>
                <div className='category-filter'>
                    <button onClick={()=>CategoryMovie("popular")} className={filterCategory === "popular" ? "active" : "not-active"}>Popular</button>
                    <button onClick={()=>CategoryMovie("upcoming")} className={filterCategory === "upcoming" ? "active" : "not-active"}>Upcoming</button>
                    <button onClick={()=>{CategoryMovie("topRated")}} className={filterCategory === "topRated" ? "active" : "not-active"}>Top Rated</button>
                </div>
                <div className='filter-search'>
                <input className='search w-100' placeholder='search movies...' onChange={({target})=>search(target.value)}></input>
                </div>
    
            </div>

            <div className='movie-container mt-5'>
                {loading? (<div className='text-center'> <ClipLoader color="#ffffff" loading={loading} size={50} /></div>) : <MovieList/>}
            </div>
            <div className={showPagination === true ? 'd-flex justify-content-center mt-5' : 'd-none justify-content-center mt-5'}>
      
                <button onClick={prevPage} className={disabled === true ? 'disabled btn-page prev-page mx-3' : 'btn-page prev-page mx-3'}><FontAwesomeIcon icon={faChevronLeft} style={{ color: 'white', fontSize: '16px' }} /></button>
                <button onClick={nextPage} className='btn-page next-page mx-3'><FontAwesomeIcon icon={faChevronRight} style={{ color: 'white', fontSize: '16px' }} /></button>
            </div>
            {show && <ModalPopup/>}
            </div>
        </header>
        </div>
    );
}

export default ShowCategoryMovie;