import React, { useState } from 'react';
import { getProducts } from '../../services/Products';
import { EditableProduct } from '../../components';
import ProductData from '../../components/DataModels/ProductData';
import './Products.scss';

const Products = () => {

  const [ products, setProducts] = useState([]);
  const [ error, setError] = useState('');
  const [ loading, setLoading ] = useState(false);
  const updateLoading = (flag:boolean) => {
    setLoading(flag);
  };
  const fetchProducts = async () => {
    const res = await getProducts();
    if(!res){
      setError('error while getting products');
      return;
    }
    setProducts(res);
  }; 
  React.useEffect(()=>{
    fetchProducts();
  },[]);
  
  return (
    <div className="products">
      <div className="content">
        { products &&
            products.map(( product:ProductData ) => (
              <EditableProduct key={product.type} product={ product } loading={loading} updateLoading={updateLoading}  />
            ))
        }
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default Products;