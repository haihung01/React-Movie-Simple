import React, { Fragment } from 'react';
import MovieList from '../components/movie/MovieList';
// import Banner from '../components/banner/Banner';

const HomePage = () => {
    return (
        <Fragment>
            {/* <Banner></Banner> */}
            <section className="movies-layout page-container pb-20">
                <h2 className='capitalize text-white mb-10 text-3xl font-bold'>
                    Now playing
                </h2>
                <MovieList />
            </section>

            <section className="movies-layout page-container pb-20">
                <h2 className='capitalize text-white mb-10 text-3xl font-bold'>
                    Top rated
                </h2>
                <MovieList type='top_rated' />
            </section>

            <section className="movies-layout page-container pb-20">
                <h2 className='capitalize text-white mb-10 text-3xl font-bold'>
                    Trending
                </h2>
                <MovieList type='popular' />
            </section>
        </Fragment>
    );
};

export default HomePage;