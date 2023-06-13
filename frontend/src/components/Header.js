import React, { useState } from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const { title, route, headerEmail, onSignOut, isLoggedIn = false } = props;

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function onClickBurgerMenu() {
    setIsMenuOpened((prevState) => !prevState);
  }

  return (
    <header className="header">
      <div className="header__container-hidden">
        {isMenuOpened && (
          <div className="header__description-hidden">
            <p className="header__email">{headerEmail}</p>
            <Link className="header__link" to={route} onClick={onSignOut}>
              {title}
            </Link>
          </div>
        )}
      </div>
      <div className="header__container">
        <img className="header__logo" src={logo} />
        <div className="header__link_invise">
          {isLoggedIn ? (
            ""
          ) : (
            <Link className="header__link" to={route} onClick={onSignOut}>
              {title}
            </Link>
          )}
        </div>
        {isLoggedIn && (
          <div className="header__burger">
            <button
              className={` ${
                isMenuOpened ? "header__burger-close" : "header__burger-open"
              }`}
              onClick={onClickBurgerMenu}
            ></button>
          </div>
        )}

        <div className="header__description-visible">
          <p className="header__email">{headerEmail}</p>
          <Link className="header__link" to={route} onClick={onSignOut}>
            {title}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
