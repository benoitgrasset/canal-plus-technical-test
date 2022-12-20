import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { FC } from 'react';
import styles from '../styles/Home.module.css';

const getProgressColor = (value: number | undefined) => {
  if (!value) return 'black';
  if (value < 25) return 'red';
  if (value < 50) return 'orange';
  if (value < 75) return 'yellow';
  if (value <= 100) return 'green';
};

const CircularProgressWithLabel: FC<CircularProgressProps> = (props) => {
  const color = getProgressColor(props.value);
  return (
    <div className={styles.circularProgress} style={{ color }}>
      <CircularProgress
        color="inherit"
        thickness={4}
        variant="determinate"
        {...props}
      />
      <div className={styles.progress}>{props.value}</div>
    </div>
  );
};

export default CircularProgressWithLabel;
