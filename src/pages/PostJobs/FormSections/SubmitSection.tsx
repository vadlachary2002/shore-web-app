import React from 'react';
import { ErrorBoundary } from '../../../components';

interface Props{
  updateForm: (field: string, value: any) => void;
}

const SubmitSection =  (props: Props) => {

  const { updateForm } = props;
  const [selectState,setSelectState]=React.useState({
    email:false,
    website:false
  });
  const handleClick = (event: any) => {
    const { id, checked } = event.target;
    setSelectState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  

  return(
    <ErrorBoundary>
      <div className="side">
        <div className="headTitle">How to Submit Apply via</div>
        <div className="font-small">
          <label htmlFor="email">By Email</label>
          <input type="checkbox" name="sub" id="email" checked={selectState.email} onClick={handleClick}/>
          <label htmlFor="website">Employer’s Website</label>
          <input type="checkbox" name="sub" id="website" checked={selectState.website} onClick={handleClick}/>
        </div>
        { selectState.email &&
        <div className="row">
          <label htmlFor="sub">Email ID</label>
          <input
            type="mail"
            name="submisionEmail"
            onChange={(e)=>updateForm('contact.email',e.target.value)}
            id="sub"
            placeholder="example@gmail.com"
          />
        </div>}
        {selectState.website &&
        <div className="row">
          <label htmlFor="sub">Employer Website</label>
          <input
            type="mail"
            name="employersEmail"
            onChange={(e)=>updateForm('contact.employeeWebsite',e.target.value)}
            id="sub"
            placeholder="www.example.com" 
          />
        </div>}
      </div>
    </ErrorBoundary>
  );
};

export default SubmitSection;
