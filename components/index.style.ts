import { createUseStyles } from 'react-jss';
import { theme } from '../styles/theme';

export const useStyles = createUseStyles(
  {
    circularProgress: {
      position: 'relative',
      display: 'inline-flex',
      margin: `5px 0 0 ${theme.spacing}px`,
      background: 'rgb(8 28 34)',
      borderRadius: '50%',
    },
    progress: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
    noData: {
      width: '100%',
      textAlign: 'center',
    },
  },
  { link: true }
);
