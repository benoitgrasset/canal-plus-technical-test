import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import placeholder from '../assets/placeholder.png';
import { Result } from '../types';
import { rgbDataURL } from '../utils/blurDataURL';
import { imagePath } from '../utils/common';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { useStyles } from './Movie.style';

const MovieCard: FC<{ result: Result }> = ({ result }) => {
  const { id, poster_path, vote_average, title, release_date } = result;
  const classes = useStyles();

  const imgPath = poster_path ? imagePath + poster_path : placeholder;

  return (
    <div key={id} className={classes.movie}>
      <Link href={`/movie/${id}`}>
        <div className={classes.imgWrapper}>
          <Image
            fill
            sizes="200px" /* to avoid warnings */
            quality={40} /* for better performances */
            src={imgPath}
            alt="backdrop"
            loading="lazy"
            placeholder="blur"
            blurDataURL={rgbDataURL(159, 165, 164)}
            className={classes.image}
          />
        </div>
      </Link>
      <div className={classes.details}>
        <div className={classes.circularProgress}>
          <CircularProgressWithLabel
            value={vote_average * 10}
            label={vote_average}
          />
        </div>
        <h3>
          <Link href={`/movie/${id}`}>{title}</Link>
        </h3>
        <div className={classes.date}>{release_date}</div>
      </div>
    </div>
  );
};

export default MovieCard;
