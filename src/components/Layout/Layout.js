import React from 'react';
import Navbar from '../Navbar/Navbar';

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <div>
        {React.cloneElement(props.children, { ...props })}
      </div>
    </div>
  )
};

export default Layout;