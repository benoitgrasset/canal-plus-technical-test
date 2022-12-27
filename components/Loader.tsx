import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';
import { useStyles } from './Components.style';

const Loader: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.noData}>
      <h2>Loading...</h2>
      <CircularProgress />
    </div>
  );
};

export default Loader;
