import React , { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../HomePage/HomePage';
import  ProductSelectionPage  from '../ProductSelectionPage/ProductSelectionPage';
import { ErrorBoundary, Message } from '../../components';
import './userProfile.scss';

const Profile = ()=>{

  const { state } = useContext(UserContext);
  const history = useHistory();
  if(!state.user){
    history.push('/login');
    return ;
  }
  return(
    <ErrorBoundary>
      <div className="userProfile">
        <ProductSelectionPage />
      </div>
    </ErrorBoundary>
  );
};
export default Profile;
