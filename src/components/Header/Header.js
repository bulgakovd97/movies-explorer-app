import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const Header = ({ isLoggedIn }) => {
  return (
    <header className='header'>
      <Logo />

      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;