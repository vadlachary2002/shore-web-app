import  ProductData  from '../../components/DataModels/ProductData';
import { REACT_BACKEND_URL } from '../../config';
import axios from 'axios';
import FormData from '../../components/DataModels/FormData';
const instance = axios.create({
  withCredentials: true,
});

interface PaymentProps{
  form: FormData,
  product: ProductData,
}
export const payment = async (props:PaymentProps) => {
  const { form, product } = props;
  try{
    const res = await instance.post(`${REACT_BACKEND_URL}/v1/checkout/page`,{form,product});
    return res;
  }catch(error){
    return error.response;
  }
};