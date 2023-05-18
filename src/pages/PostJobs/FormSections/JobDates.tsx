import React from 'react';
import { ErrorBoundary } from '../../../components';
interface Props{
  updateForm: (field: string, value: any) => void;
}

const JobDates =  (props: Props) => {

  const { updateForm } = props;
  
  return(
    <ErrorBoundary>
      <div className="side">
        <div className="headTitle">Dates</div>
        <div className="row">
          <label htmlFor="appClosingDate">
            Application Deadline
            <span className="mandatoryField">*</span>
          </label>
          <input
            className="input"
            min={new Date().toISOString().split('T')[0]}
            max={new Date('9999-12-30').toISOString().split('T')[0]}
            type="date"
            required
            name="appClosingDate"
            onChange={(e)=>updateForm('dates.closingDate',e.target.value)}
            id="appClosingDate"
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default JobDates;
