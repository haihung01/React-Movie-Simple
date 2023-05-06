import React, { useEffect, useState } from 'react';
// import MovieList from '../components/movie/MovieList';
import { fetcher } from '../config';
import MovieCard from '../components/movie/MovieCard';
import useSWR from 'swr';
import useDebounce from '../hooks/useDebounce';
import ReactPaginate from 'react-paginate';
import { data } from 'autoprefixer';


// https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US

// search:  https://api.themoviedb.org/3/search/movie?api_key=



const itemsPerPage = 20;

const MoviePage = () => {


    const [nextPage, setNextPage] = useState(1);

    const [filter, setFilter] = useState("");

    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=e6ae53f90f39ad4d8584385a580100da&page=${nextPage}`);

    const filterDebounce = useDebounce(filter, 500);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }

    const { data, error } = useSWR(url, fetcher);

    const loading = !data && !error;

    useEffect(() => {
        if (filterDebounce) {
            setUrl(`https://api.themoviedb.org/3/search/movie?api_key=e6ae53f90f39ad4d8584385a580100da&query=${filterDebounce}&page=${nextPage}`);
        } else {
            setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=e6ae53f90f39ad4d8584385a580100da&page=${nextPage}`);
        }
    }, [filterDebounce, nextPage]);


    const movies = data?.results || [];

    // react-paginate
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        if (!data || !data.total_results) return;
        const endOffset = itemOffset + itemsPerPage;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset])


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };

    // console.log(data)


    return (

        <div className='py-10 page-container'>
            <div className="flex m-10">
                <div className="flex-1">
                    <input
                        type='text'
                        className='w-full p-4 bg-slate-800 text-white outline-none'
                        placeholder='Type here to search...'
                        onChange={handleFilterChange}
                    />
                </div>

                <button className='p-4 bg-primary text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </button>
            </div>

            {loading && (
                <div className='w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin'>
                </div>
            )}
            <div className="grid grid-cols-4 gap-10">
                {!loading &&
                    movies.length > 0 && movies.map(item => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='paginate'
                />
            </div>

        </div>
    );
};

export default MoviePage;