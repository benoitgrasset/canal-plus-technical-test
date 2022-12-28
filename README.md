This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

The app is deployed [here](https://canal-plus-technical-test.vercel.app/)

## What is expected

- To render a list of movies or series from [themoviedb](https://www.themoviedb.org/)

- To view details about a movie or a serie by clicking on it

## API

The request can be passed using the following key:
API key (v3): `92b418e837b833be308bbfb1fb2aca1e`

Documentation:
https://developers.themoviedb.org/3/

HTTP request exemple:

```
    GET
    https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-
US&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false
```

## Technos

`NextJS` (server side rendering, lazy loading for images, ...) and `create-next-app` to create a new Next.js app within seconds

`Vercel` for deployment, simply deploy a Next app to the cloud

[cssinjs](https://cssinjs.org/?v=v10.9.2) for styling, with robustness

[mui](https://mui.com/material-ui/getting-started/overview/) UI library to have nice components faster

[react-query](https://tanstack.com/query/v4) hooks for fetching, caching and updating state. To use infinite scrolling and load dynamically movies when scrolling.
Also to store the data in cache and use it when needed

`typescript` for type safety

`react-testing-library` for unit tests

## TODO

- improve Readme
- add unit tests with `react-testing-library`
- update movie detail page
- improve circle progress layout, le remonter
