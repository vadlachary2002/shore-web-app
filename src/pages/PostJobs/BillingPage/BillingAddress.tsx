import React,{useState} from 'react';
import { ErrorBoundary } from '../../../components';
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
interface Props{
  props:Det,
  check:boolean,
  funcHandler:(name:string,val:string)=>void,
}
const BillingAddress=(det:Props)=>{

  const update=(e:any)=>{
    det.funcHandler(e.target.name,e.target.value);
  };
  return (
    <ErrorBoundary>
      <div className="side" >
        <div className="row">
          <label htmlFor="fname">Full Name</label>
          <input type="text" name="fname" readOnly={det.check} onChange={update} placeholder={det.check?det.props.fname:''}  required id="fname" />
        </div>
        <div className="row">
          <label htmlFor="position">Position</label>
          <input type="text" name="position" readOnly={det.check} onChange={update} placeholder={det.check?det.props.position:''} required id="position" />
        </div>
        <div className="row">
          <label htmlFor="orgName">Organization Name</label>
          <input type="text" name="orgName" readOnly={det.check} onChange={update}  placeholder={det.check?det.props.orgName:''} required id="orgName" />
        </div>
        <div className="row">
          <label htmlFor="street">Street and Avenue</label>
          <input type="text" name="street"  readOnly={det.check} onChange={update} placeholder={det.check?det.props.street:''} required id="street" />
        </div>
        <div className="row">
          <label htmlFor="state">State</label>
          <input type="text" name="state"  readOnly={det.check} onChange={update} placeholder={det.check?det.props.state:''} required id="state" />
        </div>
        <div className="row">
          <label htmlFor="country">Country</label>
          <input type="text" name="country"  readOnly={det.check} onChange={update} placeholder={det.check?det.props.country:''} required id="country" />
        </div>
        <div className="row">
          <label htmlFor="pscode">Postal Code</label>
          <input type="number" name="pscode" readOnly={det.check} onChange={update} placeholder={det.check && det.props.pscode?det.props.pscode.toString():''} required id="pscode" />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input type="mail" name="email" readOnly={det.check} onChange={update} placeholder={det.check?det.props.email:''} required id="email" />
        </div>
        <div className="row">
          <label htmlFor="pno">Phone Number</label>
          <input type="number" name="pno" readOnly={det.check} onChange={update} placeholder={det.check && det.props.pno?det.props.pno.toString():''} required id="pno" />
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default BillingAddress;
