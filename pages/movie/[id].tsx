import { useRouter } from 'next/router';
import { FC } from 'react';

const Movie: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{`Movie ${id}`}</div>;
};

export default Movie;
