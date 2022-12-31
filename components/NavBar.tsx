import Link from 'next/link';
import { FC } from 'react';
import { useStyles } from '../styles/index.style';
import SearchBar from './SearchBar';

const NavBar: FC = () => {
  const classes = useStyles();

  return (
    <header className={classes.navbar}>
      <nav className={classes.nav}>
        <Link href="/">Movies</Link>
      </nav>
      <SearchBar />
    </header>
  );
};

export default NavBar;
