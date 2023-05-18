import React , { useState }from 'react';
import './Message.scss';
interface Props{
  message:string;
  color:string;
}
const Message = (props:Props) =>{
  const { message, color} = props;
  const [ popUp, setPopUp] = useState('show');
  const showPopUp = ()=>{
    setPopUp('show');
  };
  const hidePopUp = ()=>{
    setPopUp('hide');
  };
  setTimeout(() => {
    hidePopUp();
  }, 2000);
  return (
    <div className={'popupMessage color'+color+' '+popUp+'-popup'} onClick={hidePopUp}>
      {message}
    </div>
  );
};
export default Message;
