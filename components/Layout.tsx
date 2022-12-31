import React, { FC } from 'react';
import { useStyles } from '../styles/index.style';
import Meta from './Meta';
import NavBar from './NavBar';

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Meta />
      <NavBar />
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default Layout;
