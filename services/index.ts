import { Movies, SortBy } from '../types';

const baseUrl = 'https://api.themoviedb.org/3';

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const language = 'en-US';
const timezone = 'America/New_York';

export const getMovies = async (
  page: number = 1,
  sort_by: SortBy = 'popularity.desc'
) => {
  const url = `${baseUrl}/discover/tv?api_key=${api_key}&language=${language}&sort_by=${sort_by}&page=${page}&timezone=${timezone}&include_null_first_air_dates=false`;

  const movies: Promise<Movies> = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error(error.message));

  return movies;
};
