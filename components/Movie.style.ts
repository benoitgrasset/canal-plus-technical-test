import { createUseStyles } from 'react-jss';
import { imgHeight, imgWidth, theme } from '../styles/theme';

export const useStyles = createUseStyles(
  {
    movie: {
      width: `${imgWidth}px`,
    },
    imgWrapper: {
      position: 'relative',
      width: '100%',
      height: `${imgHeight}px`,
    },
    image: {
      objectFit: 'cover' /* preserve aspect ratio */,
      objectPosition: 'center',
      borderRadius: theme.borderRadius,
      '&:hover': {
        boxShadow: 'rgb(0 0 0 / 55%) 0 5px 15px',
      },
    },
    date: {
      color: 'rgb(0 0 0 / 60%)',
    },
    details: {
      position: 'relative',
      paddingTop: '25px',
    },
    circularProgress: {
      position: 'absolute',
      top: '-30px',
      left: '7px',
    },
  },
  { link: true }
);
