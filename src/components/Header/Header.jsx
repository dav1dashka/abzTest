import React from "react";

import logo from '../../img/Logo.svg';
import './Header.scss';

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__left">
            <a href="/" className="header__logo">
              <img src={logo} alt="Logo" />
            </a>
          </div>
          <div className="header__right">
            <div className="header__links">
              <a href="/" className="header__users button">Users</a>
              <a href="/" className="header__sing button">Sing up</a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
