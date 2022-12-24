import ArrowUpward from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loader from '../components/Loader';
import Movie from '../components/Movie';
import { NoData } from '../components/NoData';
import { getMovies } from '../services';
import styles from '../styles/Home.module.css';
import { itemLabels, Movies, SortBy } from '../types';

const hasQueryError = (query: string) => query.trim() === '';

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
  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState(false);
  const router = useRouter();
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    setQueryError(hasQueryError(query));
  };

  const disabledQuery = queryError || query === ''; // initially query is empty and error is false

  const setSearchRoute = () => router.push(`/search?query=${query}`);

  const handleEnterSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !disabledQuery) {
      setSearchRoute();
    }
  };

  const handleClickSearch = () => {
    !disabledQuery && setSearchRoute();
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
      <Tooltip
        classes={{ tooltip: styles.tooltipError }}
        title={queryError ? 'Query must not be empty' : ''}
      >
        <TextField
          variant="outlined"
          label="Search a movie"
          fullWidth
          value={query}
          onChange={handleTextChange}
          onKeyDown={handleEnterSearch}
          className={styles.textfield}
          error={queryError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  aria-label="search"
                  onClick={handleClickSearch}
                  disabled={disabledQuery}
                >
                  <SearchIcon color={disabledQuery ? 'disabled' : 'primary'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>
      <FormControl>
        <InputLabel>Filter</InputLabel>
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
      </FormControl>
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
          page.results.map((result) => (
            <Movie key={result.id} result={result} />
          ))
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
