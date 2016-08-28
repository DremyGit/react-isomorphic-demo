import React from 'react';
import styles from './style.css';
import Navbar from '../Navbar/Navbar';

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <div className={styles.main} >
        {React.cloneElement(props.children, { ...props })}
      </div>
    </div>
  )
};

export default Layout;