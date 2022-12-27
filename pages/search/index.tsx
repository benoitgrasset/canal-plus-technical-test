import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Movie from '../../components/Movie';
import { NoData } from '../../components/NoData';
import { getSearch } from '../../services';
import { useStyles } from '../../styles/index.style';

const Search: FC = () => {
  const router = useRouter();
  const { query } = router.query;
  const classes = useStyles();

  const { data: searchMovies } = useQuery(
    ['searchMovies'],
    () => getSearch((query as string) || ''),
    {
      enabled: query !== undefined,
    }
  );

  if (!searchMovies) {
    return <NoData>No result found</NoData>;
  }

  return (
    <main className={classes.main}>
      <div className={classes.movies}>
        {searchMovies.results.map((result) => (
          <Movie key={result.id} result={result} />
        ))}
      </div>
    </main>
  );
};

export default Search;
