import React, { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from './MovieCard';
// import 'swiper/scss';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';


// https://api.themoviedb.org/3/movie/now_playing?api_key=e6ae53f90f39ad4d8584385a580100da

const MovieList = ({ type = 'now_playing' }) => {
    // const [movies, setMovies] = useState([]);
    const { data } = useSWR(
        tmdbAPI.getMovieList(type), fetcher);

    const movies = data?.results || [];
    // useEffect(() => {
    //     if (data && data.results) setMovies(data.results)
    // }, [data]);
    // // console.log(data.results)

    // console.log(data)
    return (
        <div className="movie-list">
            <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
                {movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieList;