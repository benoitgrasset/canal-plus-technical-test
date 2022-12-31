import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { FC } from 'react';
import { useStyles } from './index.style';

const getProgressColor = (value: number | undefined) => {
  if (!value) return 'black';
  if (value < 25) return 'red';
  if (value < 50) return 'orange';
  if (value < 75) return 'yellow';
  if (value <= 100) return 'green';
};

const CircularProgressWithLabel: FC<
  CircularProgressProps & { label: number }
> = (props) => {
  const classes = useStyles();
  const color = getProgressColor(props.value);
  return (
    <div className={classes.circularProgress} style={{ color }}>
      <CircularProgress
        color="inherit"
        thickness={4}
        size={50}
        variant="determinate"
        {...props}
      />
      <div className={classes.progress}>{props.label}</div>
    </div>
  );
};

export default CircularProgressWithLabel;
