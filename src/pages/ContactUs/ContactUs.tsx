import React,{useState} from 'react';
import { ErrorBoundary } from '../../components';
import { sendQuery } from '../../services/ContactUs';
import { validate } from './validate';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPhone,faEnvelope,faMapMarker } from '@fortawesome/free-solid-svg-icons';
import './ContactUs.scss';

const ContactUs = ( ) => {
  const [formStatus,setFormStatus]= useState({status:'',color:''});
  const [ btnStatus, setBtnStatus ] = useState(false);
  const [formData,setFormData]= useState({email:'',companyName:'',name:'',query:''});
  const { call,email,map} = {call:'+44(0) 1223 326 528',email:'service@shorebirdie.org',map:'https://www.google.com/maps'};
  const onSubmit= async (e:any)=>{
    e.preventDefault();
    const body = formData;
    setBtnStatus(true);
    if(validate(body)){
      const response = await sendQuery({body});
      if(response){
        setFormStatus({status:'Email sent', color:'green'});
      }else{
        setFormStatus({status:'Error!', color:'red'});
      }
    }
    setTimeout(() => {
      setFormStatus({status:'',color:''});
      setBtnStatus(false);
    }, 2000);
  };
  const handleChange=(e:any)=>{
    setFormData(prevFormData=>{
      return{
        ...prevFormData,
        [e.target.name]:e.target.value
      };
    });
  };
  const redirectToCall = () => {
    const url = 'tel:'+call;
    window.location.replace(url);
  };
  const redirectToEmail = () => {
    const url = 'mailto:'+email;
    window.location.replace(url);
  };
  const redirectToMap = () => {
    window.location.replace(map);
  };
  return (
    <ErrorBoundary>
      <div className="contactContainer">
        <div className="box leftContentBox" >
          <div className="heading">
            We are here for you
          </div>
          <div className="writeup">
            Our team speaks English, German, French, Spanish, Italian, Swedish, Arabic and Chineese and will respond to your query  within 24 hours.
          </div>
          <div className="body">
            <div className='items'>
              International 9:00 AM - 5:30 PM
            </div>
            <div onClick={redirectToCall} className='items'>
              <FA icon={faPhone}/>
              <span> {call} </span>
            </div>
            <div onClick={redirectToEmail} className='items'>
              <FA icon={faEnvelope}/>
              <span> service@shorebirdie.org </span> 
            </div>
            <div onClick={redirectToMap} className='items'>
              <FA icon={faMapMarker} />
              <span> US ,Canada & South America </span> 
            </div>
          </div>
        </div>
        <div className="box contentBox">
          <div>
            <form onSubmit={onSubmit} action='#' >
              <input type="email" name="email"  value={formData.email} required onChange={handleChange} placeholder="Email"/>
              <input type="text" name="name" value={formData.name} required onChange={handleChange} placeholder="Full Name"/>
              <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange}  placeholder="Company Name"/>
              <textarea name="query" onChange={handleChange} required placeholder="Message" id="" cols={30} rows={5}></textarea>
              <div className='flexSide'>
                <button type="submit" className={btnStatus?'sendingBtn':'sendBtn'}>{btnStatus?'Sending':'Send Message'} </button>
                <span className={'submitStatus '+formStatus.color} >{formStatus.status}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ContactUs;
