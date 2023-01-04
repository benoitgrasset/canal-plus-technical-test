import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import 'intersection-observer';
import mockRouter from 'next-router-mock';
import 'react-intersection-observer';
import Layout from '../components/Layout';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { mockMovies } from '../mock';
import Home from '../pages/index';

jest.mock('../hooks/useFetchMovies.ts', () => ({
  useFetchMovies: jest.fn(),
}));

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

const queryClient = new QueryClient();

describe('While loading', () => {
  beforeEach(() => {
    (useFetchMovies as jest.Mock).mockImplementation(() => ({}));
  });

  it('renders a Loader', () => {
    (useFetchMovies as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});

describe('Without data', () => {
  it('renders NoData', () => {
    (useFetchMovies as jest.Mock).mockImplementation(() => ({
      movies: undefined,
      isLoading: false,
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const NoData = screen.getByTestId('no-data');
    expect(NoData).toBeInTheDocument();
  });
});

describe('With data', () => {
  it('renders movies', async () => {
    (useFetchMovies as jest.Mock).mockImplementation(() => ({
      movies: mockMovies,
      isLoading: false,
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Home />
        </Layout>
      </QueryClientProvider>
    );

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    const movies = screen.getAllByTestId(/^movie-/);
    expect(movies).toHaveLength(20);
  });

  it('renders movie details', async () => {
    (useFetchMovies as jest.Mock).mockImplementation(() => ({
      movies: mockMovies,
      isLoading: false,
    }));
    mockRouter.setCurrentUrl('/movie/76600');
    render(
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Home />
        </Layout>
      </QueryClientProvider>
    );

    const movieDetails = screen.getByTestId('movie-details');
    expect(movieDetails).toBeInTheDocument();
  });
});
