import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import placeholder from '../assets/placeholder.png';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import { useStyles } from '../styles/index.style';
import { MovieDetail } from '../types';
import { rgbDataURL } from '../utils/blurDataURL';
import { imagePath } from '../utils/common';

const width = 300;

type Props = {
  result: MovieDetail;
};

const MovieDetails: FC<Props> = ({ result }) => {
  const {
    backdrop_path,
    overview,
    poster_path,
    genres,
    vote_average,
    vote_count,
    popularity,
    original_language,
    title,
    release_date,
    runtime,
  } = result;

  const posterPath = poster_path ? imagePath + poster_path : placeholder;
  const backdropPath = backdrop_path ? imagePath + backdrop_path : placeholder;

  const classes = useStyles({ backdropPath });

  return (
    <div className={classes.movieDetails}>
      <div className={classes.movieBackground}>
        <div className={classes.customBg}>
          <div className={classes.flexContainer}>
            <div className={clsx(classes.imgWrapper, classes.flex1)}>
              <Image
                quality={75}
                src={posterPath}
                alt="backdrop"
                loading="lazy"
                placeholder="blur"
                blurDataURL={rgbDataURL(159, 165, 164)}
                className={classes.image}
                width={width}
                height={(width * 3) / 2}
              />
            </div>
            <div className={classes.flex2}>
              <h1 className={classes.title}>{title}</h1>
              <div className={classes.section}>
                <div>
                  <h3>Average votes</h3>
                  <CircularProgressWithLabel
                    value={vote_average * 10}
                    label={vote_average}
                  />
                </div>
                <div>
                  <h3>Popularity</h3>
                  <div>{Math.round(popularity)}</div>
                </div>
              </div>
              <div className={classes.section}>
                <div>
                  <h3>Released</h3>
                  <div>{release_date}</div>
                </div>
                <div>
                  <h3>Duration</h3>
                  <div>{Math.round(runtime / 60) + ' h'}</div>
                </div>
                <div>
                  <h3>Language</h3>
                  <div>{original_language}</div>
                </div>
              </div>
              <div>
                <h3>Number of votes</h3>
                <div>{vote_count}</div>
              </div>
              {genres && (
                <div>
                  <h3>Genres</h3>
                  <div className={classes.genres}>
                    {genres.map((genre) => (
                      <span key={genre.id}>{genre.name}</span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3>Synopsis</h3>
                <p>{overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
