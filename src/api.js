import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL
const apiKey = process.env.REACT_APP_APIKEY
const page = 1

//manggil listing 
export const getMovieList = async(page)=>{
    const movie = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}`);
    // console.log({movieList:movie})
    return movie.data.results
    
}

export const searchMovie = async(q)=>{
    const search = await axios.get(`${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`)
    return search.data
}

export const getUpcomingMovie = async(page) => {
    const upcoming = await axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`);
    // console.log({upcomingList:upcoming})
    return upcoming.data.results

}

export const getTopRatedMovie = async(page) =>{
    const topRated = await axios.get (`${baseUrl}/movie/top_rated?api_key=${apiKey}&page=${page}`)
    // console.log({topRated : topRated})
    return topRated.data.results

}