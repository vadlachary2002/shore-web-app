import React, { useState } from 'react';
import './NavBar.css';

import { Link, NavLink } from 'react-router-dom';
const NavBar = () => {
    const [options, setOptions] = useState(Array(5).fill(0));
    const clicked = () => {
        const updatedOptions = options.map((value, index) => {
            if (index == 1) {
                return 1;
            }
            return 0;
        });
        setOptions(updatedOptions);
    };
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="header">
                        <h4>
                            SHORE BRIDIE <span>logo</span>
                        </h4>
                    </div>
                    <div className="menu">
                        <div className="options active"> Home</div>
                        <div className="options"> About Us</div>
                        <div className="options"> Jobs</div>
                        <div className="options"> Contact</div>
                        <div className="options"> Post a Job</div>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default NavBar;
