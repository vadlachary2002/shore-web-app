import  { ContactData }  from '../../components/DataModels/ContactData';

export const validate=(body:ContactData)=>{
  const mandatoryFields = [
    'email','companyName','name','query'
  ];
  const  isValid = mandatoryFields.reduce((acc,field) => {
    return acc && body[field];
  },true);
  return isValid ? body: null;

};
