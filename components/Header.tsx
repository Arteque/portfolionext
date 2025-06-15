import Logo from "./Logo/Logo";
import Nav from "./Nav/Nav";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
const Header = () => {
  return (
    <header>
      <div className="container">
        <Logo />
        <Nav />
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
