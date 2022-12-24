export type Result = {
  adult: boolean;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Movies = {
  page: number;
  results: Result[];
  total_result: number;
  total_pages: number;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Image = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type Images = {
  id: number;
  backdrops: Image[];
  posters: Image[];
};

type Genre = {
  id: number;
  name: string;
};

export type Genres = { genres: Genre[] };

export const itemLabels = {
  'popularity.desc': 'popularity descending',
  'popularity.asc': 'popularity ascending',
  'release_date.asc': 'release date ascending',
  'release_date.desc': 'release date descending',
  'revenue.asc': 'revenue ascending',
  'revenue.desc': 'revenue descending',
  'primary_release_date.asc': 'primary release date ascending',
  'primary_release_date.desc': 'primary release date descending',
  'original_title.asc': 'original title ascending',
  'original_title.desc': 'original title descending',
  'vote_average.asc': 'vote average ascending',
  'vote_average.desc': 'vote average descending',
  'vote_count.asc': 'vote count ascending',
  'vote_count.desc': 'vote count descending',
} as const;

export type SortBy = keyof typeof itemLabels;
