import axios from 'axios';
import { apiKey } from "../constants";

// endpoint
const baseURL = 'https://api.themoviedb.org/3';

const trendingMoviesEndPoint = `${baseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${baseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${baseURL}/movie/top_rated?api_key=${apiKey}`;

const movieDetailsEndPoint = id => `${baseURL}/movie/${id}?api_key=${apiKey}&language=en-US`;
const movieCreditEndPoint = id => `${baseURL}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndPoint = id => `${baseURL}/movie/${id}/similar?api_key=${apiKey}`;
const searchMoviesEndPoint = `${baseURL}/search/movie?api_key=${apiKey}`;

const personDetailsEndPoint = id => `${baseURL}/person/${id}?language=en-US&api_key=${apiKey}`;
const personMoviesEndPoint = id => `${baseURL}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("error:", error);
        return {};
    }
};

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndPoint);
};

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndPoint);
};

export const fetchRatedMovies = () => {
    return apiCall(topRatedMoviesEndPoint);
};

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndPoint(id));
};

export const fetchMovieCredits = id => {
    return apiCall(movieCreditEndPoint(id));
};

export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndPoint(id));
};

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndPoint(id));
};

export const fetchPersonMovieDetails = id => {
    return apiCall(personMoviesEndPoint(id));
};

export const searchMovies = params => {
    return apiCall(searchMoviesEndPoint, params);
};