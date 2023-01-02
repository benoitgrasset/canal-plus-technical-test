import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../services';
import { Movies } from '../types';

const staleTime = 1 * 60 * 1000; // 1 minuts

export const useFetchMovies = (sortBy: string) => {
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
      staleTime,
      getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
      keepPreviousData: false,
    }
  );

  return {
    movies,
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    remove,
  };
};
