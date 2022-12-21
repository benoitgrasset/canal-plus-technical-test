import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import placeholder from '../assets/placeholder.png';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import Loader from '../components/Loader';
import { NoData } from '../components/NoData';
import { getMovies } from '../services';
import styles from '../styles/Home.module.css';
import { Movies, SortBy } from '../types';
import { rgbDataURL } from '../utils';
import { AppContext } from './_app';

export const imagePath = `https://image.tmdb.org/t/p/original`;

const itemLabels = {
  'popularity.desc': 'popularity desc',
  'popularity.asc': 'popularity asc',
  'release_date.asc': 'release date asc',
  'release_date.desc': 'release date desc',
  'revenue.asc': 'revenue asc',
  'revenue.desc': 'revenue desc',
  'primary_release_date.asc': 'primary release_date asc',
  'primary_release_date.desc': 'primary release_date desc',
  'original_title.asc': 'original title asc',
  'original_title.desc': 'original title desc',
  'vote_average.asc': 'vote average asc',
  'vote_average.desc': 'vote average desc',
  'vote_count.asc': 'vote count asc',
  'vote_count.desc': 'vote count desc',
};

const items = Object.keys(itemLabels) as SortBy[];

const MoviesPage: FC = () => {
  const {
    data: movies,
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    remove,
  } = useInfiniteQuery<Movies, Error>(
    ['movies'],
    ({ pageParam }) => getMovies(pageParam, sortBy),
    {
      staleTime: 2 * 60 * 1000, // 2 minuts
      getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
      keepPreviousData: false,
    }
  );

  const topRef = useRef<null | HTMLDivElement>(null);
  const { ref, inView } = useInView();
  const [sortBy, setSortBy] = useState<SortBy>(items[0]);
  const { updateResult } = useContext(AppContext)!;

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortBy);
    remove();
  };

  const handleScrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <Loader />;
  }

  if (!movies || !movies.pages[0].results) {
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
      <div ref={topRef} />
      <Select onChange={handleChange} value={sortBy} className={styles.select}>
        {items.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {itemLabels[item]}
            </MenuItem>
          );
        })}
      </Select>
      <Button
        variant="contained"
        onClick={handleScrollToTop}
        classes={{ root: styles.stickyButton }}
        color="secondary"
      >
        Scroll to top
      </Button>

      <div className={styles.movies}>
        {movies.pages.map((page) =>
          page.results.map((result) => {
            const { name, id, first_air_date, popularity, poster_path } =
              result;
            const imgPath = poster_path ? imagePath + poster_path : placeholder;
            return (
              <div key={id} className={styles.movie}>
                <Link
                  href={`/movie/${id}`}
                  onClick={() => updateResult(result)}
                >
                  <div className={styles.imgWrapper}>
                    <Image
                      fill
                      sizes="200px" /* to avoid warnings */
                      quality={40} /* for better performances */
                      src={imgPath}
                      alt="backdrop"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={rgbDataURL(159, 165, 164)}
                      className={styles.image}
                    />
                  </div>
                </Link>
                <h3>
                  <Link href={`/movie/${id}`}>{name}</Link>
                </h3>
                <div className={styles.date}>{first_air_date}</div>
                <CircularProgressWithLabel
                  value={Math.round(popularity / 50)}
                  label={Math.round(popularity)}
                />
              </div>
            );
          })
        )}
      </div>

      <Button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className={styles.button}
      >
        {isFetchingNextPage ? 'Loading more movies...' : notFetchingText}
      </Button>
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </>
  );
};

export default MoviesPage;
