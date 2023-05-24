import React, { useState } from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './DropDown.scss';
interface Props{
  values:string[],
  name: string,
  selected: string[],
  updateArray: (field:string,value:string[])=>void,
  updateSearchContents: (field:string,value:string|number|string[])=> void,

}
export const DropDown = (props:Props) => {

  const { values, name, selected, updateArray, updateSearchContents } = props;
  console.log(name,selected);

  const [ rotation, setRotation ] = useState('rotateup');
  const [ dropDownValues, setDropDownValues] = useState(selected);


  const capitalizeFirstLetter = (str:string) =>{
    return str.charAt(0).toUpperCase()+str.slice(1);
  };
  const dropDownName = capitalizeFirstLetter(name);

  const openCloseFields = () => {
    setRotation((updatedRotation)=>{
      if(rotation==='rotatedown'){
        return 'rotateup';
      }
      return 'rotatedown';
    });
  };
  const updateDropDown = (e:any)=>{
    const { id, checked } = e.target;
    const newDropDownValues = dropDownValues.filter((dropDownValue)=> dropDownValue!=id);
    if(checked) newDropDownValues.push(id);
    setDropDownValues((updatedDropDownValues)=>{
      updateArray(name,newDropDownValues);
      updateSearchContents(name,newDropDownValues);
      return newDropDownValues;
    });
  };

  return (
    <div className='selectFields'>
      <div className="pair">
        <FA className={rotation} icon={faPlay} onClick={openCloseFields} />
        <label className='box'> {dropDownName} </label>
        {values.length===0 && <span>Loading...</span>}
      </div>
      <div className={rotation==='rotatedown'?'fields show':'fields hide'}>
        {
          values.map((value:string)=>(
            <div className="pair" key={value}>
              <input type="checkbox" name={value} id={value} onChange={updateDropDown} checked={selected && selected.some((element)=> element===value)}  />
              <label htmlFor={value}>{value}</label>
            </div>
          ))
        }
      </div>
    </div>
  );
};