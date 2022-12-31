import { createUseStyles } from 'react-jss';

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};

export const useStyles = createUseStyles({
  main: {
    padding: '2rem',
    height: 'calc(100vh - 64px)',
    overflow: 'auto',
    scrollBehavior: 'smooth',
    marginTop: '64px',
  },

  backButton: {
    position: 'absolute',
    color: 'white',
  },

  iconButton: {
    height: '40px',
    marginLeft: '10px',
  },

  filters: {
    display: 'flex',
    alignItems: 'center',
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
    width: '100%',
  },

  select: {
    margin: 'var(--spacing) 0',
    width: '250px',
  },

  textfield: {
    background: 'white',
    marginRight: '200px',
    borderRadius: 'var(--border-radius)',
  },

  button: {
    display: 'block',
  },

  stickyButton: {
    position: 'sticky!important',
    display: 'block',
    top: '20px',
    zIndex: 99,
    margin: '0 0 var(--spacing) auto',
    textTransform: 'none',
    fontWeight: 600,
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

  movieBackground: (props: { backdropPath: string | StaticImageData }) => {
    return {
      backgroundImage: `url(${props?.backdropPath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      height: '100%',
    };
  },

  customBg: {
    color: 'white',
    height: '100%',
    backgroundImage:
      'linear-gradient(to right, rgb(31.5 31.5 52.5 / 100%) calc((50vw - 170px) - 340px), rgb(31.5 31.5 52.5 / 84%) 30%, rgb(31.5 31.5 52.5 / 84%) 100%)',
  },

  section: {
    display: 'flex',
    gap: 20,
  },

  flexContainer: {
    display: 'flex',
    gap: '50px',
    padding: '30px 60px',
  },
  '@media (max-width: 800px)': {
    flexContainer: {
      flexDirection: 'column',
    },
    movieDetails: {
      height: '1300px',
    },
  },

  flex1: {
    flex: 1,
  },

  flex2: {
    lineHeight: 1.3,
    flex: 2,
    '& div': {
      '& h3': {
        margin: 'calc(var(--spacing) * 2) 0 5px 0',
      },
    },
  },

  title: {
    marginBottom: 'var(--spacing)',
  },

  genres: {
    '& :not(:last-child):after': {
      content: '", "',
    },
  },

  tooltipError: {
    background: 'red',
  },

  notFoundContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '60px',
    '& > *': {
      margin: '10px',
    },
  },

  navbar: {
    width: '100%',
    height: '64px',
    background: 'rgb(3,37,65)',
    color: 'white',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    fontSize: '18px',
  },

  nav: {
    marginLeft: '60px',
  },
});
