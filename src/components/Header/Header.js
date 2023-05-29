import { Link, useNavigate } from "react-router-dom";

import Button from '../Button/Button';

import logo from '../../images/F.png';
import "./Header.css";

function Header({ updateAuthToken, authToken }) {
  const navigate = useNavigate();

  const onLogout = () => {
    updateAuthToken("");
    navigate("/");
  };
  return (
    <header className="Header">
      <div className="Header__container">
        <Link to="/">
          <img className="Header__logo" src={logo} alt="logo" />
        </Link>
        <Button to={authToken ? null : "/login"} onClick={authToken ? onLogout : null}>
          {authToken ? "Log out" : "Sign in"}
        </Button>

      </div>
    </header>
  );
}

export default Header;
