import Head from 'next/head';
import { FC } from 'react';

const Meta: FC = () => {
  return (
    <Head>
      <title>The Movie Database</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;