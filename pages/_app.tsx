import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';
import '../styles/globals.css';
import { Result } from '../types';

type Context = {
  id: number | null;
  result: Result | undefined;
  // eslint-disable-next-line no-unused-vars
  updateResult: (result: Result) => void;
};

export const AppContext = createContext<Context | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const [result, setResult] = useState<Result | undefined>(undefined);

  const updateResult = (result: Result) => {
    setResult(result);
  };

  const context: Context = {
    id: null,
    result,
    updateResult,
  };

  return (
    <AppContext.Provider value={context}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
