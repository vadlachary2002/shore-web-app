import React from 'react';
import { ErrorBoundary } from '../../../components';

interface Props{
  updateForm:(field:string,value:any)=>void;
}

const SalarySection =  (props: Props) => {

  const { updateForm } = props;

  return(
    <ErrorBoundary>
      <div className="side">
        <div className="headTitle">Salary Details</div>
        <div className="row">
          <label htmlFor="salary">
            Salary
            <span className="mandatoryField">*</span>
          </label>
          <input
            type="number"
            name="salary"
            onChange={(e)=>updateForm('salary.sal',e.target.value)}
            required
            id="salary"
          />
        </div>
        <div className="row">
          <label htmlFor="hours">
            Job Hours
            <span className="mandatoryField">*</span>
          </label>
          <input
            type="number"
            name="hours"
            onChange={(e)=>updateForm('salary.hours',e.target.value)}
            required
            id="hours"
          />
        </div>
        <div className="row">
          <label htmlFor="salaryType">
            Salary type
            <span className="mandatoryField">*</span>
          </label>
          <select
            className="input"
            required
            name="salaryType"
            id="jobType"
            onChange={(e)=>updateForm('salary.companyType',e.target.value)}
          >
            <option value="">select</option>
            <option value="Annual">Annual</option>
            <option value="Regular">Regular</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SalarySection;
