import React, { useState} from 'react';
import './ProductSelectionPage.scss';
import { ErrorBoundary, Product } from '../../components';
import ProductData from '../../components/DataModels/ProductData';
import { getProducts } from '../../services/Products';

const ProductSelectionPage = () => {
  const [ products, setProducts] = useState([]);
  const [ error, setError ] = useState('');
  const fetchProducts = async () => {
    const res = await getProducts();
    if(!res){
      setError('error while fetching products');
      return ;
    }
    setProducts(res);
  }; 
  React.useEffect(()=>{
    fetchProducts();
  },[]);
  return (
    <ErrorBoundary>
      <div className="job_page">
        <div className="content">
          { products &&
            products.map(( product:ProductData ) => (
              <Product key={product.type} product={ product }  />
            ))
          }
          {error && <span className='error'>{error}</span>}
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default ProductSelectionPage;
