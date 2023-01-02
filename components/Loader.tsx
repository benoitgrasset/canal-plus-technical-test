import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';
import { useStyles } from './index.style';

const Loader: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.noData} data-testid="loader">
      <h2>Loading...</h2>
      <CircularProgress />
    </div>
  );
};

export default Loader;
