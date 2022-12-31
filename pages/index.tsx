import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import { NoData } from '../components/NoData';
import { getMovies } from '../services';
import { useStyles } from '../styles/index.style';
import { itemLabels, Movies, SortBy } from '../types';

const staleTime = 1 * 60 * 1000; // 1 minuts

const items = Object.keys(itemLabels) as SortBy[];

const Home: FC = () => {
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
      staleTime,
      getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
      keepPreviousData: false,
    }
  );

  const classes = useStyles();
  const topRef = useRef<null | HTMLDivElement>(null);
  const { ref, inView } = useInView();
  const [sortBy, setSortBy] = useState<SortBy>(items[0]);

  const handleSelectChange = (event: SelectChangeEvent) => {
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
      <FormControl>
        <InputLabel>Filter</InputLabel>
        <Select
          onChange={handleSelectChange}
          value={sortBy}
          className={classes.select}
        >
          {items.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {itemLabels[item]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleScrollToTop}
        classes={{ root: classes.stickyButton }}
        color="primary"
      >
        <div className={classes.buttonContent}>
          <span className={classes.marginRight}>Scroll to top</span>
          <ArrowUpward />
        </div>
      </Button>

      <div className={classes.movies}>
        {movies.pages.map((page) =>
          page.results.map((result) => (
            <MovieCard key={result.id} result={result} />
          ))
        )}
      </div>

      <Button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className={classes.button}
      >
        {isFetchingNextPage ? 'Loading more movies...' : notFetchingText}
      </Button>
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </>
  );
};

export default Home;
