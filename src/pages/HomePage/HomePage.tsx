import React,{useState} from 'react';
import { ErrorBoundary,NavBar } from '../../components';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import {Home,Jobs,PostJobs,AboutUs,ContactUs} from '../../pages';
import './Hompage.css';


const HomePage = () => {
    return (
      <Router>
        <div className="pages">
          <ErrorBoundary>
            <NavBar/>
            <Route  path='/home' ><Home/></Route>
            <Route  path='/jobs'> <Jobs /> </Route>
            <Route  path='/postjobs'><PostJobs /></Route>
            <Route  path='/aboutus' ><AboutUs /></Route>
            <Route  path='/contactus' ><ContactUs/></Route>

          </ErrorBoundary>
        </div>
      </Router>
    );
};

export default HomePage;
