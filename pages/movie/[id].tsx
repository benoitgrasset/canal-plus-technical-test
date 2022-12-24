import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import placeholder from '../../assets/placeholder.png';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import { NoData } from '../../components/NoData';
import { getGenres } from '../../services';
import styles from '../../styles/Home.module.css';
import { rgbDataURL } from '../../utils/blurDataURL';
import { imagePath } from '../../utils/common';
import { AppContext } from '../_app';

const width = 300;

const Movie: FC = () => {
  const result = useContext(AppContext)?.result;

  const router = useRouter();
  const { id } = router.query;

  console.log('id', id);

  const { data: genres } = useQuery(['genres'], () => getGenres(), {
    staleTime: 5 * 60 * 1000,
  });

  if (!result) {
    return <NoData>No result found</NoData>;
  }

  const {
    backdrop_path,
    name,
    release_date,
    overview,
    poster_path,
    genre_ids,
    vote_average,
    vote_count,
    popularity,
  } = result;

  const posterPath = poster_path ? imagePath + poster_path : placeholder;
  const backdropPath = backdrop_path ? imagePath + backdrop_path : placeholder;

  const movieGenres = genres?.genres
    .filter((genre) => genre_ids.includes(genre.id))
    .map((genre) => genre.name);

  return (
    <main className={styles.main}>
      <div className={styles.movieDetails}>
        <div
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }}
        >
          <div className={styles.customBg}>
            <div className={styles.flexContainer}>
              <div className={clsx(styles.imgWrapper, styles.flex1)}>
                <Image
                  quality={75} /* for better performances */
                  src={posterPath}
                  alt="backdrop"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={rgbDataURL(159, 165, 164)}
                  className={styles.image}
                  width={width}
                  height={(width * 3) / 2}
                />
              </div>
              <div className={styles.flex2}>
                <h1>{name}</h1>
                <div>
                  <h3>Average votes: </h3>
                  <CircularProgressWithLabel
                    value={vote_average * 10}
                    label={vote_average}
                  />
                </div>
                {release_date && (
                  <div>
                    <h3>Released: </h3>
                    <div>{release_date}</div>
                  </div>
                )}
                <div>
                  <h3>Popularity: </h3>
                  <div>{Math.round(popularity)}</div>
                </div>
                <div>
                  <h3>Number of votes: </h3>
                  <div>{vote_count}</div>
                </div>
                {movieGenres && movieGenres.length > 0 && (
                  <div>
                    <h3>Genres: </h3>
                    <div>
                      {movieGenres.map((genre, index) => (
                        <div key={index}>{genre}</div>
                      ))}
                    </div>
                  </div>
                )}
                {overview && (
                  <div>
                    <h3>Synopsis: </h3>
                    <p>{overview}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Movie;
