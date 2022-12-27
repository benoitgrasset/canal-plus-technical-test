import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  main: {
    padding: '2rem',
    height: '100vh',
    overflow: 'auto',
    scrollBehavior: 'smooth',
  },

  movies: {
    display: 'flex',
    gap: 'calc(var(--spacing) * 2)',
    flexWrap: 'wrap',
  },

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
    borderRadius: 'var(--border-radius)',
  },

  movieDetails: {
    width: '1200px',
    height: '600px',
  },

  select: {
    margin: 'var(--spacing) 0',
    width: '250px',
  },

  textfield: {
    marginBottom: 'calc(var(--spacing) * 2)',
  },

  button: {
    display: 'block',
  },

  stickyButton: {
    position: 'sticky!important' /* mui specificity */,
    display: 'block!important',
    top: '20px',
    zIndex: 10,
    margin: '0 auto var(--spacing)!important',
    textTransform: 'none!important',
  },

  buttonContent: {
    display: 'flex',
    alignItems: 'center',
  },

  marginRight: {
    marginRight: 'var(--spacing)',
  },

  date: {
    color: 'rgb(0 0 0 / 60%)',
  },

  customBg: {
    color: 'white',
    height: '100%',
    backgroundImage:
      'linear-gradient(to right, rgb(31.5 31.5 52.5 / 100%) calc((50vw - 170px) - 340px), rgb(31.5 31.5 52.5 / 84%) 30%, rgb(31.5 31.5 52.5 / 84%) 100%)',
  },

  flexContainer: {
    display: 'flex',
    gap: '50px',
    padding: '20px 60px',
  },

  flex1: {
    flex: 1,
  },

  flex2: {
    flex: 2,
    '& div': {
      '& h3': {
        marginBottom: 'var(--spacing)',
      },
    },
  },

  title: {
    marginBottom: 'calc(var(--spacing) * 3)',
  },

  tooltipError: {
    background: 'red',
  },
});
