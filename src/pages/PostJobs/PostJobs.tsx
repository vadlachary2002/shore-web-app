import React ,{ useContext } from 'react';
import { ErrorBoundary, Product } from '../../components';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../HomePage/HomePage';
import  ProductData  from '../../components/DataModels/ProductData';
import ProductSelectionPage from '../ProductSelectionPage/ProductSelectionPage';
interface Props{
  product:ProductData
}
const PostJobs = () => {
  const { state, dispatch } = useContext(UserContext);
  const history =  useHistory();
  if(!state.user && !state.isAdmin){
    history.push('/login');
    return ;
  }
  return (
    <ErrorBoundary>
      <ProductSelectionPage />
    </ErrorBoundary>
  );
};

export default PostJobs;
