export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const apiKey = 'e6ae53f90f39ad4d8584385a580100da';

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";

const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";


export const tmdbAPI = {

    getMovieList: (type, page = 1) => ` ${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
    getMovieCredits: (movieId) => `${tmdbEndpoint}/${movieId}/credits?api_key=${apiKey}`,
    getMovieVideos: (movieId) => `${tmdbEndpoint}/${movieId}/videos?api_key=${apiKey}`,
    getMovieSimilar: (movieId) => `${tmdbEndpoint}/${movieId}/similar?api_key=${apiKey}`,

    // hoac dung cau lenh chung
    getMovieMeta: (movieId, type) => `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,

    getMovieSearch: (query, page) => `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,

    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`

};
