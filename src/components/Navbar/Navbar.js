import React from 'react';
import { Link } from 'react-router';
import styles from './style.css';

const Navbar = () => {
  return (
    <div>
      <Link to="/" className={styles.logo}>Reddit</Link>
    </div>
  )
};

export default Navbar;
