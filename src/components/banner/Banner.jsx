import React from 'react';
import { fetcher } from '../../config';
import useSWR from 'swr';
import { SwiperSlide, Swiper } from 'swiper/react';



const Banner = () => {


    const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=e6ae53f90f39ad4d8584385a580100da`,
        fetcher);

    const movies = data?.results || [];
    // console.log('sdas', movies)

    return (
        <section className="banner h-[800px] page-container mb-20 overflow-hidden">
            <Swiper grabCursor="true" slidesPerView={"auto"}>
                {movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

function BannerItem({ item }) {
    const {
        title,
        poster_path

    } = item;

    return (
        <div className="w-full h-full rounded-s-lg relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt=''
                className='w-full h-full object-cover rounded-lg object-center'
            />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className='font-bold text-3xl mb-5'>{title}</h2>
                <div className="flex items-center gap-x-3 mb-8">
                    <span className='py-2 px-4 border border-white rounded-md'>Adventure</span>
                    <span className='py-2 px-4 border border-white rounded-md'>Adventure</span>
                    <span className='py-2 px-4 border border-white rounded-md'>Adventure</span>
                </div>
                <button className='py-3 px-6 rounded-lg bg-primary text-white font-medium'>Watch Now</button>
            </div>
        </div>
    )
}

export default Banner;