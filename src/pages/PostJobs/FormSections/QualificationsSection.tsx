import React,{useState} from 'react';
import { ErrorBoundary } from '../../../components';

interface Props{
  updateForm: (field: string, value: any) => void;
}

const QualificationsSection =  (props: Props) => {

  const [qualification, setQualification] = useState('');
  const [qualifications, setQualifications] = useState([]);
  const [emptyInpurError, setEmptyInputError] = useState(false);
  const inputErrorMessage = '*Required';
  const { updateForm } = props;

  const updateQualification = (e: any)=>{
    setQualification(e.target.value);
  };

  const removeQualification = (id: string)=>{
    setQualifications((updatedQulifications)=>{
      const newQualifications=qualifications.filter((qualification)=>qualification.id!=id);
      if(newQualifications.length===0){
        updateForm('qualifications',null);
        return newQualifications;
      }
      updateForm('qualifications',newQualifications);
      return newQualifications;
    });

  };
  const addQualification = ()=>{
    if(!qualification.trim()){
      setEmptyInputError(true);
      setTimeout(() => {
        setEmptyInputError(false);
      }, 2000);
      return;
    }
    setQualifications((updatedQulifications)=>{
      const tempQualifications=[
        ...qualifications,{id:qualifications.length,value:qualification}
      ];
      updateForm('qualifications',tempQualifications);
      return tempQualifications;
    });setQualification('');
    
  };

  return(
    <ErrorBoundary>
      <div className="side">
        <div className="headTitle">
          Extra Qualifications and Skills
          <span className="mandatoryField">*</span>
        </div>
        <ul>
          {
            qualifications.map((qualification)=>(
              <li key={qualification.id}>{qualification.value}
                <span  onClick={()=>removeQualification(qualification.id)} className="mandatoryField" >x</span>
              </li>
            ))
          }
        </ul>
        <div className="row">
          <input
            type="text"
            name="extraqualification"
            onChange={updateQualification}
            onBlur={updateQualification}
            id="qlinput"
            placeholder="Bachelors/Masters/Phd"
            value={qualification}
          />
          <button type="button"  onClick={addQualification} className="addBtn" >Add+</button>
        </div>
        <div className="ErrorBox">
          <span className="inputErrorMesg">{emptyInpurError && inputErrorMessage }</span>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default QualificationsSection;
