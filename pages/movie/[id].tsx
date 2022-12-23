import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import placeholder from '../../assets/placeholder.png';
import styles from '../../styles/Home.module.css';
import { rgbDataURL } from '../../utils/blurDataURL';
import { imagePath } from '../../utils/common';
import { AppContext } from '../_app';

const Movie: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const result = useContext(AppContext)?.result;

  if (!result) {
    return <div>No results</div>;
  }

  const { backdrop_path, name, release_date, title } = result;

  const imgPath = backdrop_path ? imagePath + backdrop_path : placeholder;

  return (
    <main className={styles.main}>
      <div className={styles.movieDetails}>
        <div>{`Movie ${id}`}</div>
        <div>{`Name: ${name}`}</div>
        <div>{`Released: ${release_date}`}</div>
        <div>{`Title: ${title}`}</div>
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
      </div>
    </main>
  );
};

export default Movie;
