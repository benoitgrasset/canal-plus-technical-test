import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import placeholder from '../../assets/placeholder.png';
import styles from '../../styles/Home.module.css';
import { rgbDataURL } from '../../utils';
import { imagePath } from '../Movies';
import { AppContext } from '../_app';

const Movie: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const props = useContext(AppContext);
  const backdrop_path = props!.result?.backdrop_path;

  const imgPath = backdrop_path ? imagePath + backdrop_path : placeholder;

  return (
    <main className={styles.main}>
      <div>{`Movie ${id}`}</div>
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
    </main>
  );
};

export default Movie;
