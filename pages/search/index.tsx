import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Movie from '../../components/Movie';
import { NoData } from '../../components/NoData';
import { getSearch } from '../../services';
import styles from '../../styles/Home.module.css';

const Search: FC = () => {
  const router = useRouter();
  const { query } = router.query;

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
    <main className={styles.main}>
      <div className={styles.movies}>
        {searchMovies.results.map((result) => (
          <Movie key={result.id} result={result} />
        ))}
      </div>
    </main>
  );
};

export default Search;
