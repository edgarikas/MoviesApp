import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Inputs/Inputs';
import * as action from '../../auth/actions';
import { getLoading, getError } from '../../auth/selectors';

import './LoginPage.css';

import { useSelector, useDispatch } from 'react-redux';

const LOGIN_API = 'https://dummy-video-api.onrender.com/auth/login';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const error = useSelector(getError);
  const loading = useSelector(getLoading);

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      dispatch(action.loginFailure('empty'));
    } else {
      dispatch(action.loginLoading(true));
      dispatch(action.loginFailure(''));

      try {
        const response = await fetch(LOGIN_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.status > 399 && response.status < 600) {
          dispatch(
            action.loginFailure(
              response.status === 400 ? 'credentials' : 'request'
            )
          );
        } else {
          const { token } = await response.json();

          dispatch(action.loginSuccess(token));
          navigate('/content');
        }
      } catch (error) {
        dispatch(action.loginFailure('request'));
      } finally {
        dispatch(action.loginLoading(false));
      }
    }
  };

  return (
    <div className='Login'>
      <form className='Login__form' onSubmit={onSubmit}>
        <Input
          kind='username'
          onChange={(e) => setUsername(e.target.value)}
          label='Username'
        />
        <Input
          kind='password'
          onChange={(e) => setPassword(e.target.value)}
          label='Password'
          type='password'
        />
        <div className='Login__button'>
          <Button disabled={loading} type='submit' size='small'>
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
        </div>

        {error && <p className='Login__error'>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
