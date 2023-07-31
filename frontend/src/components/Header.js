import React from "react";
import headerLogotip from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ headerText, linkTo, userEmail, signOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogotip} alt="Логотип" />
      <div className="header__info">
        <p className="header__email">{userEmail}</p>
        <button className="header__button" onClick={signOut}>
          <Link className="header__link" to={linkTo}>
            {headerText}
          </Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
