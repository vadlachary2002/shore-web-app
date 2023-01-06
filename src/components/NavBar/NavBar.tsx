import React, { useState } from 'react';
import './NavBar.scss';
import { Link, NavLink } from 'react-router-dom';
const NavBar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="header">
                        <h4>
                            SHORE BRIDIE <span>logo</span>
                        </h4>
                    </div>
                    <div>
                      <ul>
                          <li ><NavLink exact to="/" >Home</NavLink></li>
                          <li > <NavLink to="/jobs">Jobs</NavLink></li>
                          <li ><NavLink to="/postjobs">Post a Job</NavLink></li>
                          <li > <NavLink to="/aboutus">About Us</NavLink></li>
                          <li > <NavLink to="/contactus">Contact Us</NavLink></li>
                      </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default NavBar;
