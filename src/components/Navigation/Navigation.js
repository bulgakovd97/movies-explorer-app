import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';


const Navigation = ({ isLoggedIn }) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const handleHamburgerOpen = () => {
    setIsHamburgerMenuOpen(true);
  };

  const handleHamburgerClose = () => {
    setIsHamburgerMenuOpen(false);
  };

  const handleEscUp = (evt) => {
    if (evt.key === 'Escape') {
      handleHamburgerClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscUp);

    return () => {
      document.removeEventListener('keyup', handleEscUp);
    };
  }, []);


  return (
    <>
      {isLoggedIn ? (
        <>
          <button className='navigation-auth-burger' type='button' onClick={handleHamburgerOpen} />
          <div className={`navigation-auth__popup ${isHamburgerMenuOpen && 'navigation-auth__popup_opened'}`}>
            <div className='navigation-auth-burger__container'>
              <button className='navigation-auth__close-button' type='button' onClick={handleHamburgerClose} />
              <div className='navigation-auth__movies'>
                <NavLink className='navigation-auth__main-page' activeClassName='navigation-auth__main-page_selected' to='/' exact>
                  Главная
                </NavLink>
                <NavLink className='navigation-auth__all-movies' activeClassName='navigation-auth__all-movies_selected' to='/movies'>
                  Фильмы
                </NavLink>
                <NavLink className='navigation-auth__saved-movies' activeClassName='navigation-auth__saved-movies_selected' to='/saved-movies'>
                  Сохранённые фильмы
                </NavLink>
              </div>
              <div className='navigation-auth__account-container'>
                <Link className='navigation-auth__account' to='/profile'>
                  Аккаунт
                </Link>
                <Link className='navigation-auth__account-icon' to='/profile' />
              </div>
            </div>
          </div>

          <div className='navigation-auth'>
            <div className='navigation__movies'>
              <NavLink className='navigation__all-movies' activeClassName='navigation__all-movies_selected' to='/movies'>
                Фильмы
              </NavLink>
              <NavLink className='navigation__saved-movies' activeClassName='navigation__saved-movies_selected' to='/saved-movies'>
                Сохранённые фильмы
              </NavLink>
            </div>
            <div className='navigation__account-container'>
              <Link className='navigation__account' to='/profile'>
                Аккаунт
              </Link>
              <Link className='navigation__account-icon' to='/profile'>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className='navigation'>
          <Link className='navigation__register' to='/signup'>
            Регистрация
          </Link>
          <Link className='navigation__login' to='/signin'>
            <div className='navigation__login-background'>
              Войти
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navigation;