import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { apiKey, fetcher, tmdbAPI } from '../config';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from '../components/movie/MovieCard';


const MovieDetail = () => {
    const { movieId } = useParams();
    const { data } = useSWR(
        tmdbAPI.getMovieDetails(movieId), fetcher);

    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data;

    const backgroundImageUrl = data && data.backdrop_path
        ? `url(${tmdbAPI.imageOriginal(backdrop_path)})`
        : '';

    return (
        <div className='pb-10'>
            <div className="w-full h-[600px] relative ">
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{ backgroundImage: backgroundImageUrl }}
                ></div>
            </div>

            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                <img
                    src={tmdbAPI.imageOriginal(poster_path)}
                    alt=''
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            <h1 className='text-center text-4xl text-white mb-10 font-bold'>{title}</h1>
            {genres.length > 0 && (
                <div className="flex items-center justify-center gap-x-5 mb-10">
                    {genres.map((item) => (
                        <span
                            className='py-2 px-4 border-primary text-primary border rounded'
                            key={item.id}>
                            {item.name}
                        </span>
                    ))}
                </div>
            )}

            <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">{overview}</p>
            <MovieCredits />
            <MovieVideos />
            <MovieSimilar />

        </div>
    );
};

function MovieCredits() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieCredits(movieId), fetcher);

    if (!data) return null;
    const { cast } = data;
    if (!cast || cast.lenght <= 0) return null;



    return (
        <div className='py-10'>
            <h2 className='text-center text-3xl mb-10'>Casts</h2>
            <div className='grid grid-cols-4 gap-5'>
                {cast.slice(0, 4).map(item => (
                    <div key={item.id} className='cast-item'>
                        <img
                            src={tmdbAPI.imageOriginal(item.profile_path)}
                            className='w-full h-[350px] object-cover rounded-lg mb-3'
                            alt='' />
                        <h3 className='text-xl font-medium'>{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
};


function MovieVideos() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieVideos(movieId), fetcher);

    if (!data) return null;
    const { results } = data;
    if (!results || results.lenght <= 0) return null;

    return (
        <div className='py-10'>
            <div className='flex flex-col gap-10'>
                {results.slice(0, 4).map((item) => (
                    <div className='' key={item.id}>
                        <h3 className='mb-5 text-xl font-medium p-3 bg-secondary inline-block'>{item.name}</h3>
                        <div key={item.id} className='w-full aspect-video'>
                            <iframe
                                width="1271"
                                height="715"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title="AMEE - “dreAMEE” the 1st live acoustic show (full) | Hoàng Dũng, Ricky Star"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className='w-full h-full object-fill'
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

function MovieSimilar() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieSimilar(movieId), fetcher);

    if (!data) return null;
    const { results } = data;
    if (!results || results.lenght <= 0) return null;


    return (
        <div className='px-10'>
            <h2 className='text-3xl font-medium mb-10'>Similar movies</h2>
            <div className="movie-list">
                <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
                    {results.length > 0 && results.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}


export default MovieDetail;
