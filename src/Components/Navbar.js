import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className='navbar'>
        <Link to='/' className='logo'>
          assistant
        </Link>
        <Link to='/todo'>Todo</Link>
      </div>
    </nav>
  );
};

export default Navbar;
