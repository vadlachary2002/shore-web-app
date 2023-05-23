import React,{ useState } from 'react';
import { DropDown } from './DropDown';
import { getSectors } from '../../../services/Utils';

interface Props{
  selected: string[],
  updateArray: (field:string,value:string[])=>void,
  updateSearchContents: (field:string,value:string|number|string[])=> void,

}
export const Sectors = (props:Props)=>{

  const { selected, updateArray, updateSearchContents } = props;
  const [allSectors, setAllSectors] = useState([]);

  const fetchSectors = async ()=>{
    const res = await getSectors();
    setAllSectors(res);
  };
  React.useEffect(()=>{
    fetchSectors();
  },[]);

  return (
    <DropDown 
      name={'sector'} 
      values={allSectors} 
      updateSearchContents={updateSearchContents} 
      selected={selected} 
      updateArray={updateArray} 
    />
  );
};