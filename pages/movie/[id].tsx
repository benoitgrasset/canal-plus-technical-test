import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC } from 'react';
import MovieDetails from '../../components/MovieDetails';
import { NoData } from '../../components/NoData';
import { getMovieDetails } from '../../services';

const MoviePage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: result } = useQuery(['movie-details'], () =>
    getMovieDetails(Number(id))
  );

  if (!result) {
    return <NoData>No result found</NoData>;
  }

  return <MovieDetails result={result} />;
};

export default MoviePage;
