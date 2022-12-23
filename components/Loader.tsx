import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';
import styles from '../styles/Home.module.css';

const Loader: FC = () => {
  return (
    <div className={styles.noData}>
      <h2>Loading...</h2>
      <CircularProgress />
    </div>
  );
};

export default Loader;
