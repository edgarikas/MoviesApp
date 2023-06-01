import { Link, useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import Button from '../Button/Button';

import logo from '../../images/F.png';
import './Header.css';
import * as AUTH from '../../auth/types';
import { getToken } from '../../auth/selectors';

function Header({ logout }) {
  const navigate = useNavigate();
  const token = useSelector(getToken);

  const onLogout = () => {
    navigate('/');
    logout();
  };
  return (
    <header className='Header'>
      <div className='Header__container'>
        <Link to={token ? '/content' : '/'}>
          <img className='Header__logo' src={logo} alt='logo' />
        </Link>
        <div className='Header__Menu'>
          <Button size='small' to='/favorites'>
            Movies ❤️
          </Button>
        </div>
        <Button to={token ? null : '/login'} onClick={token ? onLogout : null}>
          {token ? 'Log out' : 'Sign in'}
        </Button>
      </div>
    </header>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch({ type: AUTH.LOGOUT });
    },
  };
}

export default connect(null, mapDispatchToProps)(Header);
