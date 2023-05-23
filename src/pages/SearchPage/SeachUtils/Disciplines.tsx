import React,{ useState } from 'react';
import { DropDown } from './DropDown';
import { getDisciplines } from '../../../services/Utils';

interface Props{
  selected: string[],
  updateArray: (field:string,value:string[])=>void,
  updateSearchContents: (field:string,value:string|number|string[])=> void,

}
export const Disciplines = (props:Props)=>{

  const { selected, updateArray, updateSearchContents } = props;
  const [allDisciplines, setAllDisciplines] = useState([]);

  const fetchDicipline = async ()=>{
    const res = await getDisciplines();
    setAllDisciplines(res);
  };
  React.useEffect(()=>{
    fetchDicipline();
  },[]);

  return (
    <DropDown 
      name={'discipline'} 
      values={allDisciplines} 
      updateSearchContents={updateSearchContents} 
      selected={selected} 
      updateArray={updateArray} 
    />
  );
};