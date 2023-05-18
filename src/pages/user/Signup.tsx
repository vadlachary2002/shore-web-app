import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../HomePage/HomePage';
import { signup } from '../../services/Authentication';
import './auth.scss';

function Signup() {

  const { state, dispatch } = useContext(UserContext);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ logging, setLogging ] = useState(false);

  const History = useHistory();

  const handleLogging = (status:boolean) =>{
    setLogging(status);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(event);
    handleLogging(true);
    const body={
      username: username,
      email: email,
      password: password,
    };
    const res = await signup({ body });
    if(res.status === 201){
      window.alert('successful SignUp');
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
        <h2>SIGN UP</h2>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
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
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <div className="btn">
          <button type="submit" className={logging?'btnLogging':''}>{logging?'Signing in':'Signup'}</button>
        </div>

        <p>already have an account?{' '}<Link to="/login" className="Link">Login</Link></p>
      </form>
    </div>
  );
}
export default Signup;
