import React,{ useState } from 'react';
import './Footer.scss';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPhone,faEnvelope,faMapMarker, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {

  const { call,email,map} = {call:'+44(0) 1223 326 528',email:'service@shorebirdie.org',map:'https://www.google.com/maps'};


  const redirectToCall = () => {
    const url = 'tel:'+call;
    window.location.replace(url);
  };
  const redirectToEmail = () => {
    const url = 'mailto:'+email;
    window.location.replace(url);
  };
  const redirectToMap = () => {
    window.location.replace(map);
  };
  return(
    <div className="footer">
      <div className="foot-top social-media-icons">
        <div className="width80">
          <a href="#"><FA icon={faFacebook} /></a>
          <a href="#"><FA icon={faInstagram} /></a>
          <a href="#"><FA icon={faLinkedinIn} /></a>
        </div>
      </div>
      <div className="foot-middle">
        <div className="company-text">
          <div className='flex'>
            <h4 className="font-heading">
              <NavLink exact to="/">
                <span className="color">Shore</span>
                <span className="color">Birdie</span>
              </NavLink>
            </h4>
          </div>
          <p> shorebirdie.com is a jobs profile company which serves the vacancies of any job throughout the world
            we,shorebirdie team provides you the better accruate services and allows you to post your vacancies in your company.
            
          </p>
        </div>
        <div className="links">
          <label className="color font-heading">Usefull Links</label>
          <ul>
            <li><Link to='/postjobs'><FA icon={faExternalLink} />Post a Job</Link></li>
            <li><Link to='/home'><FA icon={faExternalLink} />Jobs</Link></li>
            <li><Link to='/contactus'><FA icon={faExternalLink} />Queries</Link></li>
            <li><Link to='/login'><FA icon={faExternalLink} />Login</Link></li>
          </ul>
        </div>
        <div className="contact-details">
          <div className="box color font-heading" >
            Contact Details
          </div>
          <div className='box'>
              International 9:00 AM - 5:30 PM
          </div>
          <div onClick={redirectToCall} className='box'>
            <FA icon={faPhone}/>
            <span> {call} </span>
          </div>
          <div onClick={redirectToEmail} className='box'>
            <FA icon={faEnvelope}/>
            <span> service@shorebirdie.org </span> 
          </div>
          <div onClick={redirectToMap} className='box'>
            <FA icon={faMapMarker} />
            <span> US ,Canada & South America </span> 
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>@2023 Copyright:</span>
        <span><b>Shorebirdie.com</b></span>
      </div>
    </div>
  );
};

export default Footer;