import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import { FC, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import { NoData } from '../components/NoData';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { useStyles } from '../styles/index.style';
import { Order, SortBy } from '../types';

const itemLabels: Record<SortBy, string> = {
  popularity: 'popularity',
  release_date: 'release date',
  revenue: 'revenue',
  primary_release_date: 'primary release date',
  original_title: 'original title',
  vote_average: 'vote average',
  vote_count: 'vote count',
};

const ordersLabels: Record<Order, string> = {
  asc: 'ascending order',
  desc: 'descending order',
};

const items = Object.keys(itemLabels) as SortBy[];

const Home: FC = () => {
  const classes = useStyles();
  const topRef = useRef<null | HTMLDivElement>(null);
  const { ref, inView } = useInView();
  const [sortBy, setSortBy] = useState<SortBy>(items[0]);
  const [order, setOrder] = useState<Order>('desc');

  const sortByOrder = `${sortBy}.${order}`;

  const {
    remove,
    movies,
    fetchNextPage,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useFetchMovies(sortByOrder);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortBy);
    remove();
  };

  const handleScrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderClick = () => {
    setOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
    remove();
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <Loader />;
  }

  if (!movies?.pages[0].results) {
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
      <div className={classes.filters}>
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
        <Tooltip title={ordersLabels[order]}>
          <IconButton onClick={handleOrderClick} className={classes.iconButton}>
            {order === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
          </IconButton>
        </Tooltip>
      </div>

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

      <div className={classes.movies} data-testid="movies">
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
