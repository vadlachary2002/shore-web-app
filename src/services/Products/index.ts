import { REACT_BACKEND_URL } from '../../config';
import  ProductData  from '../../components/DataModels/ProductData';
import axios from 'axios';
const instance = axios.create({
  withCredentials: true,
});

export const getProducts = async () => {
  try{
    const res = await axios.get<ProductData[]>(`${REACT_BACKEND_URL}/v1/products/get`);
    return res.data;
  }catch( error ) {
    return null;
  }
};
export const updateProduct = async (product:ProductData) => {
  try{
    const res = await instance.post(`${REACT_BACKEND_URL}/v1/products/update`,{product});
    return res;
  }catch(error){
    return error.response;
  }
};