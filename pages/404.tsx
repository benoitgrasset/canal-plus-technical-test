import Button from '@mui/material/Button';
import { FC } from 'react';
import { useStyles } from '../styles/index.style';

const NotFound: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.notFoundContainer}>
      <h1>404</h1>
      <span>Page not found</span>
      <Button href="/" variant="contained">
        <h2>Go home</h2>
      </Button>
    </div>
  );
};

export default NotFound;
