import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import Loader from '../components/Loader';
import { NoData } from '../components/NoData';
import { getMovies } from '../services';
import styles from '../styles/Home.module.css';
import { Movies, SortBy } from '../types';

const aspectRatio = 16 / 9;
const width = 200;

const imagePath = `https://image.tmdb.org/t/p/original`;

const imageLoader = ({ src }: { src: string }) => imagePath + src;

const items: SortBy[] = ['popularity.desc', 'popularity.asc'];

const MoviesPage: FC = () => {
  const {
    data: movies,
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<Movies, Error>(
    ['movies'],
    ({ pageParam }) => getMovies(pageParam, sortBy),
    {
      staleTime: 2 * 60 * 1000, // 2 minuts
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    }
  );

  const { ref, inView } = useInView();
  const [sortBy, setSortBy] = useState<SortBy>('popularity.desc');

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortBy);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <Loader />;
  }

  if (!movies) {
    return <NoData />;
  }

  if (error) {
    return <div>{`An error has occurred: ${error.message}`}</div>;
  }

  const notFetchingText = hasNextPage
    ? 'Load more movies'
    : 'No more movies to load';

  return (
    <>
      <FormControl fullWidth>
        <Select onChange={handleChange} value={sortBy}>
          {items.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div className={styles.movies}>
        {movies.pages.map((page) =>
          page.results.map((result) => {
            const { name, id, first_air_date, popularity } = result;
            return (
              <div key={id} className={styles.movie}>
                {result.backdrop_path && (
                  <Link href={`/movie/${id}`}>
                    <Image
                      loader={imageLoader}
                      src={result.backdrop_path}
                      alt="backdrop"
                      width={width}
                      height={width / aspectRatio}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="../assets/placeholder.png"
                    />
                  </Link>
                )}
                <h3>
                  <Link href={`/movie/${id}`}>{name}</Link>
                </h3>
                <div>{first_air_date}</div>
                <CircularProgressWithLabel
                  value={Math.round(popularity / 50)}
                />
              </div>
            );
          })
        )}

        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading more movies...' : notFetchingText}
        </button>
        <div>
          {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
        </div>
      </div>
    </>
  );
};

export default MoviesPage;
