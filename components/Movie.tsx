import Image from 'next/image';
import Link from 'next/link';
import { FC, useContext } from 'react';
import placeholder from '../assets/placeholder.png';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import { AppContext } from '../pages/_app';
import styles from '../styles/Home.module.css';
import { Result } from '../types';
import { rgbDataURL } from '../utils/blurDataURL';
import { imagePath } from '../utils/common';

const Movie: FC<{ result: Result }> = ({ result }) => {
  const { name, id, first_air_date, poster_path, vote_average } = result;

  const imgPath = poster_path ? imagePath + poster_path : placeholder;

  const { updateResult } = useContext(AppContext)!;

  return (
    <div key={id} className={styles.movie}>
      <Link href={`/movie/${id}`} onClick={() => updateResult(result)}>
        <div className={styles.imgWrapper}>
          <Image
            fill
            sizes="200px" /* to avoid warnings */
            quality={40} /* for better performances */
            src={imgPath}
            alt="backdrop"
            loading="lazy"
            placeholder="blur"
            blurDataURL={rgbDataURL(159, 165, 164)}
            className={styles.image}
          />
        </div>
      </Link>
      <h3>
        <Link href={`/movie/${id}`}>{name}</Link>
      </h3>
      <div className={styles.date}>{first_air_date}</div>
      <CircularProgressWithLabel
        value={vote_average * 10}
        label={vote_average}
      />
    </div>
  );
};

export default Movie;
