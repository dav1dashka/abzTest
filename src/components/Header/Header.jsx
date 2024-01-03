import React from "react";

import logo from '../../img/Logo.svg';
import './Header.scss';

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__left">
            <button className="header__logo" type="button">
              <img src={logo} alt="Logo" />
            </button>
          </div>
          <div className="header__right">
            <div className="header__links">
              <button type="button" className="header__users button">Users</button>
              <button type="button" className="header__sing button">Sing up</button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
