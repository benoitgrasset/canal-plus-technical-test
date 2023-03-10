import React, { FC } from 'react';
import { useStyles } from './index.style';

export const NoData: FC<{ children?: React.ReactNode }> = (props) => {
  const classes = useStyles();
  return (
    <h2 className={classes.noData} data-testid="no-data">
      {props.children || 'No movies fetched'}
    </h2>
  );
};
