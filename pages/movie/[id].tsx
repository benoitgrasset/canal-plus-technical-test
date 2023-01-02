import { useRouter } from 'next/router';
import { FC } from 'react';
import MovieDetails from '../../components/MovieDetails';
import { NoData } from '../../components/NoData';
import { useFetchMovieDetails } from '../../hooks/useFetchMovieDetails';

const MoviePage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { result } = useFetchMovieDetails(Number(id));

  if (!result) {
    return <NoData>No result found</NoData>;
  }

  // if id doesn't exist
  if (!result.id) {
    return <NoData>Movie id not found</NoData>;
  }

  return <MovieDetails result={result} />;
};

export default MoviePage;
