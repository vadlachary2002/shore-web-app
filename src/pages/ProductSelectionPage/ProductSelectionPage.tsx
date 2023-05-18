import React, { useState} from 'react';
import './ProductSelectionPage.scss';
import { ErrorBoundary, Product } from '../../components';
import ProductData from '../../components/DataModels/ProductData';
import { getProducts } from '../../services/Products';

const ProductSelectionPage = () => {
  const [ products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await getProducts();
    if(res.status===200){
      setProducts(res.data);
    }
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
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default ProductSelectionPage;
