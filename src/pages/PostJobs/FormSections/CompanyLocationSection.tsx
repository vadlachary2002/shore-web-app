import React from 'react';
import { ErrorBoundary } from '../../../components';

interface Props{
  updateForm: (field: string, value: any) => void;
}

const CompanyLocationSection =  (props: Props) => {

  const { updateForm } = props;

  return(
    <ErrorBoundary>
      <div className="side">
        <div className="headTitle">Company Location Details</div>
        <div className="row">
          <label htmlFor="city">
            City
            <span className="mandatoryField">*</span>
          </label>
          <input
            type="text"
            name="city"
            onChange={(e)=>updateForm('location.city',e.target.value)}
            required
            id="city"
          />
        </div>
        <div className="row">
          <label htmlFor="state">
            State
            <span className="mandatoryField">*</span>
          </label>
          <input
            type="text"
            name="state"
            onChange={(e)=>updateForm('location.state',e.target.value)}
            required
            id="state"
          />
        </div>
        <div className="row">
          <label htmlFor="country">
            Country
            <span className="mandatoryField">*</span>
          </label>
          <input
            type="text"
            name="country"
            onChange={(e)=>updateForm('location.country',e.target.value)}
            required
            id="country"
          />
        </div>
        <div className="row">
          <label htmlFor="region">
            Region
            <span className="mandatoryField">*</span>
          </label>
          <select
            className="input"
            required
            name="region"
            id="region"
            onChange={(e)=>updateForm('location.region',e.target.value)}
          >
            <option value="">select</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="South America">South America</option>
            <option value="Asia Pacific">Asia Pacific</option>
            <option value="Australia">Australia</option>
            <option value="Working from home">Working from home</option>
            <option value="Middle East">Middle East</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CompanyLocationSection;
