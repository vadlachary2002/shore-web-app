import React,{useState} from 'react';
import { ErrorBoundary } from '../../../components';
import { Multiselect } from 'multiselect-react-dropdown';
import { getDisciplines, getTitles } from '../../../services/Utils';
interface Props{
  updateForm:(field:string,value:any)=>void;
}
const JobTitleSection = (props:Props) => {
  const { updateForm } = props;
  const [options, setOptions] = useState([]);
  const [titles, setTitles] = useState([]);
  const updateDiscipline=(field: string,value: any)=>{
    if(value.length==0){
      updateForm(field,null);
      return;
    }
    updateForm(field,value);
  };
  const fetchDiscipline = async ()=>{
    const res = await getDisciplines();
    setOptions(res);
  };
  const fetchTitles = async ()=>{
    const res = await getTitles();
    setTitles(res);
  };
  React.useEffect(()=>{
    fetchDiscipline();
    fetchTitles();
  },[]);



  return (
    <ErrorBoundary>
      <div className="side">
        <div className="headTitle">Job Details</div>
        <div className="row">
          <label htmlFor="title">
          Job Title
            <span className="mandatoryField">*</span>
          </label>
          <select
            className="input"
            required
            name="title"
            id="title"
            onChange={(e)=>updateForm('job.title',e.target.value)}
          >
            <option value="">select</option>
            {
              titles && titles.map((title)=>(
                <option value={title} key={title}>{title}</option>
              ))
            }
          </select>
        </div>
        <div className="row">
          <label htmlFor="qualification">
            Qualification
            <span className="mandatoryField">*</span>
          </label>
          <input
            type="text"
            name="qualification"
            onChange={(e)=>updateForm('job.qualification',e.target.value)}
            required
            id="qualification"
          />
        </div>
        <div className="row">
          <label htmlFor="experience">
            Experience
            <span className="mandatoryField">*</span>
          </label>
          <input
            type="text"
            name="experience"
            onChange={(e)=>updateForm('job.experience',e.target.value)}
            required
            id="experience"
          />
        </div>
        <div className="row">
          <label htmlFor="title">
          Discipline
            <span className="mandatoryField">*</span>
          </label>
          <Multiselect className='multi'
            onSelect={(e)=>updateDiscipline('discipline',e)}
            onRemove={(e)=>updateDiscipline('discipline',e)}
            isObject={false}
            options={options}
            selectedValues={[]}
          />
        </div>
        <div className="row">
          <label htmlFor="jobType">
            Job Type
            <span className="mandatoryField">*</span>
          </label>
          <select
            className="input"
            required
            name="jobType"
            id="jobType"
            onChange={(e)=>updateForm('job.type',e.target.value)}
          >
            <option value="Full-time">Full-Time</option>
            <option value="Contract">Contract</option>
            <option value="Part-time">Part-Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default JobTitleSection;
