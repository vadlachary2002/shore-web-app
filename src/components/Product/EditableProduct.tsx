import React,{ useState } from 'react';
import { ErrorBoundary } from '../../components';
import  ProductData  from '../DataModels/ProductData';
import './Product.scss';
import { ToggleSwitch } from '../MessageBox/ToggleSwitch';
import { updateProduct } from '../../services/Products';
interface Props{
  product: ProductData,
  loading: boolean,
  updateLoading: (flag:boolean)=> void,
}

const EditableProduct = (props:Props) => {

  const { product, loading, updateLoading } = props;
  const [productForm , setProductForm ] = useState(product);
  const [ rotateCard, setRotateCard ] =  useState(false);
  const [ error , setError ] = useState('');
  const [ status , setStatus ] = useState('save');

  const submit   = async () =>{
    if(loading) return ;
    setRotateCard(true);
    updateLoading(true);
    const res = await updateProduct(productForm);
    
    setTimeout(() => {
      setRotateCard(false);
      if(res.status!=200) {
        setError('Failed');
      }else{
        
        setStatus('success');
      }
      updateLoading(false);
    }, 2000);
    setTimeout(() => {
      setStatus('save');
      setError('');
    }, 4000);
  };
  const updateProductForm = (field:string,value:any)=>{
    setProductForm((prevForm)=>{
      return {
        ...prevForm,
        [field]:value
      };
    });
    console.log(productForm);
  };
  const updateOffer = (field:string,value:boolean) => {
    const newoffers = productForm.offers.filter((offer)=> {
      if(offer.field!=field) return offer;
      console.log(offer);
      offer.value=value;
      return offer;
    });
    setProductForm((prevForm)=>{
      return{
        ...prevForm,
        ['offers']:newoffers,
      };
    });
  };
  
  return (
    <ErrorBoundary>
      <div className={ rotateCard? 'col rotateCard':loading?'col setOpacity':'col'}>
        <div className="heading">{productForm.type}</div>
        <div className="flexRow">
          <div className='flexColumn'>
            <span><i>Amount</i></span>
            <input className='inputBox' type="text" value={productForm.amount}  onChange={(e)=>updateProductForm('amount',e.target.value)}/>
          </div>
          <div className='flexColumn'>
            <span>Hosting Time </span>
            <input className='inputBox' type="text" value={productForm.hostingTime} onChange={(e)=>updateProductForm('hostingTime',e.target.value)}/>
          </div>
        </div>
        {
          productForm.offers.map((offer)=>(
            <div className="flex" key={offer.field}>
              <p key={offer.field}>{offer.field}</p>
              <div className='outerTab' >
                <ToggleSwitch key={productForm.type+offer.field} offer={offer.field} value={offer.value} onChange={updateOffer} />
              </div>
            </div>
          ))
        }
        <div className="btn">
          <button className={error?'failed':status} onClick={submit}>
            {error?error:status}
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default EditableProduct;