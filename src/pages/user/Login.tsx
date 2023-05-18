import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { login } from '../../services/Authentication';
import './auth.scss';
import { UserContext } from '../HomePage/HomePage';

function Login() {
  const { state, dispatch } = useContext(UserContext);
  const [ logging, setLogging ] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ authCookie, setAuthCookie, removeAuthCookie] = useCookies([]);

  const History = useHistory();
  const handleLogging = (status:boolean) => {
    setLogging(status);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    handleLogging(true);
    const body={
      email:email,
      password:password
    };
    const res = await login({body});
    console.log(res);
    if(res.status===200){
      if(res.data.isAdmin){
        dispatch({ type: 'ADMIN', payload: true});
      }else{
        dispatch({ type: 'USER', payload: true});
      }
      if(res.data.isAdmin){
        setAuthCookie('isAdmin',true);
      }
      setAuthCookie('SESSION',res.data.token);
      History.push('/profile');
    }else{
      setError(res.data.message);
    }
    handleLogging(false);
  };
  if(state.user){
    History.push('/profile');
    return ;
  }
  if(state.isAdmin){
    History.push('/dashboard');
    return ;
  }
  return (
    <div className="container-auth">
      <form onSubmit={handleSubmit} method="POST">
        <h2>LOGIN</h2>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error">{error}</div>}
        <div className="btn">
          <button type="submit" className={logging?'btnLogging':''}>{logging?'Logging in':'Login'}</button>
        </div>

        <p>Dont have an account?{' '}<Link to="/signup" className="Link">Sign up</Link></p>
      </form>
    </div>
  );
}
export default Login;
