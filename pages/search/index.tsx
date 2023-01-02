import { useRouter } from 'next/router';
import { FC } from 'react';
import MovieCard from '../../components/MovieCard';
import { NoData } from '../../components/NoData';
import { useSearchMovies } from '../../hooks/useSearchMovies';
import { useStyles } from '../../styles/index.style';

const Search: FC = () => {
  const router = useRouter();
  const { query } = router.query;
  const classes = useStyles();

  const { searchMovies } = useSearchMovies(query as string);

  if (!searchMovies) {
    return <NoData>No result found</NoData>;
  }

  return (
    <main className={classes.main}>
      <div className={classes.movies}>
        {searchMovies.results.map((result) => (
          <MovieCard key={result.id} result={result} />
        ))}
      </div>
    </main>
  );
};

export default Search;
