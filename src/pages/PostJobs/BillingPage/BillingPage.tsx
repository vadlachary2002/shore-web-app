import React,{useState} from 'react';
import { ErrorBoundary } from '../../../components';
import './BillingPage.scss';
import BillingAddress from './BillingAddress';
interface Det{
  fname:string,
  position:string,
  orgName:string,
  street:string,
  state:string,
  country:string,
  pscode:number,
  email:string,
  pno:number,
}
const BillingPage = ()=>{
  const [checkBox,setCheckBox]= useState(false);
  const [details,setDetails]= useState({
    fname:'',
    position:'',
    orgName:'',
    street:'',
    state:'',
    country:'',
    pscode:null,
    email:'Example@gmail.com',
    pno:null,
  });
  const checkBoxHandler =()=>{
    if(checkBox){
      setCheckBox(false);
      return;
    }
    setCheckBox(true);
  };
  const formHandler=(e:any)=>{
    e.preventDefault();
  };
  const updateForm=(name:string,val:string)=>{
    let prev=details;
    details[name]=val;
    setDetails(prev);
  };
  return(
    <ErrorBoundary>
      <form className="billingForm" >
        <div className="superSection">
          <div className="sections">
            <div className="side marginzero">
              <div className="headTitle">Billing Details</div>
            </div>
            <BillingAddress props={details} check={false} funcHandler={updateForm} />
          </div>
          <div className="sections">
            <div className="side marginzero">
              <div className="headTitle">Ordered By:</div>
              <div className="font-checkox">
                <label htmlFor="mail">Same as Above Mentioned Details    </label>
                <input type="checkbox" checked={checkBox} onChange={checkBoxHandler} name="sub" id="mail" />
              </div>
            </div>
            <BillingAddress props={details} check={checkBox} funcHandler={null}/>
          </div>
        </div>
        <div className="sections">
          <div className="downside">
            <button type="submit" className="btnstyle" >Back</button>
            <button type="submit" onClick={formHandler} className="btnstyle" >Next</button>
          </div>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default BillingPage;
