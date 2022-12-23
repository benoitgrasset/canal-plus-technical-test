import ArrowUpward from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loader from '../components/Loader';
import Movie from '../components/Movie';
import { NoData } from '../components/NoData';
import { getMovies } from '../services';
import styles from '../styles/Home.module.css';
import { Movies, SortBy } from '../types';
import { basicFilter } from '../utils';

const itemLabels = {
  'popularity.desc': 'popularity descending',
  'popularity.asc': 'popularity ascending',
  'release_date.asc': 'release date ascending',
  'release_date.desc': 'release date descending',
  'revenue.asc': 'revenue ascending',
  'revenue.desc': 'revenue descending',
  'primary_release_date.asc': 'primary release date ascending',
  'primary_release_date.desc': 'primary release date descending',
  'original_title.asc': 'original title ascending',
  'original_title.desc': 'original title descending',
  'vote_average.asc': 'vote average ascending',
  'vote_average.desc': 'vote average descending',
  'vote_count.asc': 'vote count ascending',
  'vote_count.desc': 'vote count descending',
} as const;

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
  const [name, setName] = useState('');
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      console.log('search: ', name);
    }
  };

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
      <TextField
        variant="outlined"
        label="Search a movie"
        fullWidth
        value={name}
        onChange={handleTextChange}
        onKeyDown={handleSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Select
        onChange={handleSelectChange}
        value={sortBy}
        className={styles.select}
      >
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
        color="primary"
      >
        <div className={styles.buttonContent}>
          <span>Scroll to top</span>
          <ArrowUpward />
        </div>
      </Button>

      <div className={styles.movies}>
        {movies.pages.map((page) =>
          page.results
            .filter((result) => basicFilter(result.name, name))
            .map((result) => <Movie key={result.id} result={result} />)
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
