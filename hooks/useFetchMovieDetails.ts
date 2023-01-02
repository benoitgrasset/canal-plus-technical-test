import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../services';

export const useFetchMovieDetails = (id: number) => {
  const { data: result } = useQuery(['movie-details'], () =>
    getMovieDetails(id)
  );

  return {
    result,
  };
};
