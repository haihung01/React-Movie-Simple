export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const apiKey = 'e6ae53f90f39ad4d8584385a580100da';

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";

export const tmdbAPI = {

    getMovieList: (type) => ` ${tmdbEndpoint}/${type}?api_key=${apiKey}`,
    getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
    getMovieCredits: (movieId) => `${tmdbEndpoint}/${movieId}/credits?api_key=${apiKey}`,
    getMovieVideos: (movieId) => `${tmdbEndpoint}/${movieId}/videos?api_key=${apiKey}`,
    getMovieSimilar: (movieId) => `${tmdbEndpoint}/${movieId}/similar?api_key=${apiKey}`
};
