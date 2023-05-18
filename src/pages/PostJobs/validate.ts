import  FormData  from '../../components/DataModels/FormData';

const validate=(form:FormData)=>{
  const mandatoryFields = [
    'job.title', 'job.qualification', 'job.experience', 'company.name', 'company.companyType', 'company.logo', 'location.city', 'location.state', 'location.country',
    'location.region', 'dates.closingDate','salary.sal', 'salary.hours', 'salary.companyType',
    ,'discipline','qualifications','duties'
  ];
  const  isValid = mandatoryFields.reduce((acc,field) => { 
    if (field === 'qualifications' || field === 'duties' || field === 'discipline') {
      return acc && !(!form[field]);
    }
    const subFields = field.split('.');
    return acc && !(!form[subFields[0]][subFields[1]]); 
  },true);
  return isValid ? form: null;

};

export default validate;