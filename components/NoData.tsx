import React, { FC } from 'react';
import styles from '../styles/Home.module.css';

export const NoData: FC<{ children?: React.ReactNode }> = (props) => {
  return (
    <h2 className={styles.noData}>{props.children || 'No movies fetched'}</h2>
  );
};
