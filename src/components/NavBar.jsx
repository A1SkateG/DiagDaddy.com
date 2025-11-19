import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/NavBar.css';

/**
 * Primary navigation bar displayed at the top of every page.
 * It includes the site logo/name on the left and navigation links on the right.
 */
export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav__left">
        <NavLink to="/" className="nav__brand">
          <img src="/logo.png" alt="Diag‑Daddy logo" className="nav__logo" />
          <span className="nav__name">Diag‑Daddy</span>
        </NavLink>
      </div>
      <div className="nav__right">
        <NavLink to="/signin" className="nav__link" activeclassname="nav__link--active">
          Sign In
        </NavLink>
        <NavLink to="/register" className="nav__link" activeclassname="nav__link--active">
          Register
        </NavLink>
      </div>
    </nav>
  );
}