import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const MainMenu = ({ expanded, toggleMenu }, context) => (
  <div className={`collapse navbar-collapse justify-content-end ${ expanded ? ' opened' : ''}`} id="navbar-collapse">
    <ul className="navbar-nav">

      <li className={`nav-item ${context.pathname === '/' ? 'active' : ''}`}>
        <Link href="/">
          <a className="nav-link">
            <span onClick={toggleMenu}>Home</span>
          </a>
        </Link>
      </li>

      <li className={`nav-item ${context.pathname === '/about' ? 'active' : ''}`}>
        <Link href="/about">
          <a className="nav-link">
            <span onClick={toggleMenu}>About</span>
          </a>
        </Link>
      </li>

    </ul>
  </div>
);

MainMenu.contextTypes = {
  pathname: PropTypes.string,
};

export default MainMenu;
