import React, { useState ,useContext } from 'react';
import './NavBar.scss';
import Logo from './../images/logo.png';
import {NavLink} from 'react-router-dom';
import Flex from './../Flex/Flex';
import { UserContext } from '../../pages/HomePage/HomePage';
const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [profilePopUp,setProfilePopUp] = useState('hide');
  const handleProfilePopUp=()=>{
    setProfilePopUp((updatedProfilePopUp)=>{
      return profilePopUp==='show'?'hide':'show';
    });
  };
  const RenderMenu = () =>{
    if(state.user){
      return(
        <>
          <li ><NavLink to="/postjobs">Post a Job</NavLink></li>
          <li ><NavLink to="/contactus">Contact Us</NavLink></li>
          <ul className='profileList'>
            <li onClick={handleProfilePopUp}>Profile</li>
            <li>
              <div className={'profilePop '+profilePopUp}>
                <NavLink to="/profile">Account</NavLink>
                <NavLink to="/userdashboard">Dashboard</NavLink>
                <NavLink to="/logout">Logout</NavLink>
              </div>
            </li>
          </ul>
        </>
      );
    }
    if(state.isAdmin){
      return(
        <>
          <li ><NavLink to="/postjobs">Post a Job</NavLink></li>
          <ul >
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/logout">Logout</NavLink></li>
          </ul>
        </>
      );
    }
    else{
      return(
        <>
          <li ><NavLink to="/contactus">Contact Us</NavLink></li>
          <ul>
            <li><NavLink to="/signup">Signup</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
        </>
      );
    }
  };

  const [mobview,setMobview]= useState('invisible');
  const onClick=()=>{
    if(mobview==='visible'){
      setMobview('invisible');
    }else{
      setMobview('visible');
    }
  };
  return (
    <nav className="navbar">
      <div className="main">
        <div className="header">
          <Flex>
            <img className="img" src={Logo} />
            <h4>
              <NavLink exact to="/">
                <span className="color-blue">Shore</span>
                <span className="color-yellow">Birdie</span>
              </NavLink>
            </h4>
          </Flex>
        </div>
        <div className="container">
          <div>
            <ul>
              <li ><NavLink exact to="/" >Jobs</NavLink></li>
              <RenderMenu />
            </ul>
          </div>
        </div>
      </div>
      <div className="mobview">
        <div className="container">
          <div className="header">
            <img className="img" src={Logo} />
            <h4 className="margin">
              <span className="color-blue">Shore</span>
              <span className="color-yellow">Birdie</span>
            </h4>
            <button className="menubar" onClick={onClick}>
              <span ></span>
              <span ></span>
              <span ></span>
            </button>
          </div>
          <div className={'options '+mobview}>
            <ul onClick={()=> setMobview('invisible')}>
              <ul>
                <li ><NavLink exact to="/" >Jobs</NavLink></li>
                <RenderMenu />
              </ul>
            </ul>
          </div >
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
