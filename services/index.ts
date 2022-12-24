import { Genres, Images, MovieDetail, Movies, SortBy } from '../types';

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

export const getGenres = async () => {
  const url = `${baseUrl}/genre/movie/list?api_key=${api_key}&language=en-US`;

  const genres: Promise<Genres> = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error(error.message));

  return genres;
};

/**
 * only for movies
 * @param movie_id
 * @returns
 */
export const getMovieDetails = async (movie_id: number) => {
  const url = `${baseUrl}/movie/${movie_id}?api_key=${api_key}&language=en-US`;

  const movie: Promise<MovieDetail> = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error(error.message));

  return movie;
};

/**
 * only for movies
 * @param movie_id
 * @returns
 */
export const getMovieImages = async (movie_id: number) => {
  const url = `${baseUrl}/movie/${movie_id}/images?api_key=${api_key}&language=en-US`;

  const images: Promise<Images> = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error(error.message));

  return images;
};

export const getSearch = async (query: string) => {
  const url = `${baseUrl}/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`;

  const search: Promise<Movies> = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error(error.message));

  return search;
};
