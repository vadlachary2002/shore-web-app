import React, { useState } from 'react';
import './ToggleSwitch.scss';

interface Props{
  value: boolean,
  offer: string,
  onChange: (field:string,value:any)=>void,
}
export const ToggleSwitch = (props:Props)=> {

  const {  value,offer, onChange} = props;

  const [ checked, setChecked ] =  useState(value);
  const check = () => {
    onChange(offer,!checked);
    setChecked(!checked);
  };
  return (
    <div className={checked?'toggle active':'toggle inactive' } onClick={check}>
      <label className={checked?'circle Move':'circle'}>
      </label>
    </div>
  );
};