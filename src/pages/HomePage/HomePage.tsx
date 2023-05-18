import React,{useState, createContext , useReducer} from 'react';
import { useCookies } from 'react-cookie';
import { ErrorBoundary,NavBar, PaymentSuccess, PaymentCancel } from '../../components';
import {HashRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {User,Home,PostJobs,Form,ContactUs,ProductSelectionPage,BillingPage,Login,Logout,Signup,Profile,Admin,SearchPage} from '../../pages';
import { FullJobView } from '../SearchPage/SeachUtils/FullJobView';
import { initialState, reducer } from '../../Reducer/userReducer';
export const UserContext = createContext(null);
const HomePage = () => {
  const [ authCookie, setAuthCookie, removeAuthCookie] = useCookies([]);
  if(authCookie.SESSION){
    if(authCookie.isAdmin){
      initialState.isAdmin=true;
    }else{
      initialState.user=true;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <div>
        <UserContext.Provider value={{ state, dispatch }}>
          <ErrorBoundary>
            <NavBar/>
            <Switch>
              <Route exact path='/' ><Home/></Route>
              <Route  path='/home' ><Home/></Route>
              <Route  path='/postjobs'><PostJobs /></Route>
              <Route  path='/contactus'><ContactUs/></Route>
              <Route path='/postajob' ><Form /></Route>
              <Route path='/login' ><Login /></Route>
              <Route path='/signup' ><Signup /></Route>
              <Route path='/logout' ><Logout /></Route>
              <Route path='/profile' ><Profile/></Route>
              <Route path='/dashboard'><Admin /></Route>
              <Route path='/userdashboard'><User/></Route>
              <Route path='/success' ><PaymentSuccess /></Route>
              <Route path='/cancel' ><PaymentCancel /></Route>
              <Route path='/search' ><SearchPage /></Route>
              <Route path='/job/:jobId' ><FullJobView /></Route>
            </Switch>
          </ErrorBoundary>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default HomePage;
