import { useQuery } from '@tanstack/react-query';
import { getSearch } from '../services';

export const useSearchMovies = (query: string) => {
  const { data: searchMovies } = useQuery(
    ['searchMovies'],
    () => getSearch(query || ''),
    {
      enabled: query !== undefined,
    }
  );

  return {
    searchMovies,
  };
};
