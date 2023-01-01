import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  {
    movie: {
      width: 'var(--img-width)',
    },
    imgWrapper: {
      position: 'relative',
      width: '100%',
      height: 'var(--img-height)',
    },
    image: {
      objectFit: 'cover' /* preserve aspect ratio */,
      objectPosition: 'center',
      borderRadius: ' var(--border-radius)',
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
  },
  { link: true }
);
