import { InfiniteData } from '@tanstack/react-query';
import { Movies } from '../types';
import { mockResults } from './mockResults';

export const mockMovies: InfiniteData<Movies> | undefined = {
  pages: [
    { page: 1, total_pages: 36536, total_result: 730708, results: mockResults },
  ],
  pageParams: [null],
};
